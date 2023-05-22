package models

import (
	"APIFinancaPessoal/db"
	"fmt"
	"time"
)

type Renda struct {
	Id        int       `json:"id"`
	Nome      string    `json:"nome"`
	Tipo      string    `json:"tipo"`
	Valor     float64   `json:"valor"`
	Mensal    bool      `json:"mensal"`
	Mes       time.Time `json:"mes"`
	UsuarioId string    `json:"userId"`
}

type RendasAll struct {
	Rendas []struct {
		Id        int       `json:"id"`
		Nome      string    `json:"nome"`
		Tipo      string    `json:"tipo"`
		Valor     float64   `json:"valor"`
		Mensal    bool      `json:"mensal"`
		Mes       time.Time `json:"mes"`
		UsuarioId string    `json:"userId"`
	} `json:"rendas"`
	Count int `json:"count"`
}

func SalvarRenda(nome, tipo string, mes time.Time, usuarioId string, mensal bool, valor float64) (int64, string) {

	db := db.ConectaBancoDados()
	insertDB, err := db.Prepare("insert into renda(nome,tipo,valor,mensal,mes,usuarioId) value(?,?,?,?,?,UUID_TO_BIN(\"" + usuarioId + "\")) ")

	fmt.Println(mes)

	if err != nil {
		panic(err.Error())
		//return 0, err.Error()
	}

	result, errinsert := insertDB.Exec(nome, tipo, valor, mensal, mes)

	if errinsert != nil {
		return 0, errinsert.Error()
	}

	rowsAffected, errRow := result.RowsAffected()

	if errRow != nil {
		panic(errRow.Error())

	}
	defer db.Close()
	return rowsAffected, ""

}

func GetAllRenda(skip, take int, usuarioId string) RendasAll {
	db := db.ConectaBancoDados()

	reusltSelec, errSelec := db.Query("select id , nome , tipo ,valor , mensal, mes  from renda where usuarioId= UUID_TO_BIN(\""+usuarioId+"\") order by mes  limit ?,?", skip, take)

	if errSelec != nil {
		panic(errSelec.Error())
	}

	r := Renda{}
	rendas := RendasAll{}

	for reusltSelec.Next() {
		var id int
		var nome, tipo string
		var valor float64
		var mensal bool
		var mes time.Time

		err := reusltSelec.Scan(&id, &nome, &tipo, &valor, &mensal, &mes)

		if err != nil {
			panic(err.Error())

		}
		r.Id = id
		r.Nome = nome
		r.Tipo = tipo
		r.Valor = valor
		r.Mensal = mensal
		r.Mes = mes

		rendas.Rendas = append(rendas.Rendas, r)

	}

	defer db.Close()

	errQts := db.QueryRow("select count(*) as qts from renda where usuarioId= UUID_TO_BIN(\"" + usuarioId + "\")").Scan(&rendas.Count)
	if errQts != nil {
		panic(errQts.Error())
	}

	return rendas

}

func GetRendaID(id int, usuarioId string) (Renda, string) {
	db := db.ConectaBancoDados()
	var renda Renda

	strungSelect := "select id,nome,tipo,valor,mensal,mes,BIN_TO_UUID(usuarioId) from renda where id =? and usuarioId=UUID_TO_BIN(\"" + usuarioId + "\")"

	err := db.QueryRow(strungSelect, id).Scan(&renda.Id, &renda.Nome, &renda.Tipo, &renda.Valor, &renda.Mensal, &renda.Mes, &renda.UsuarioId)

	if err != nil {
		return renda, err.Error()
	}

	defer db.Close()

	return renda, ""
}
func DeleteRenda(id int) (int, string) {
	db := db.ConectaBancoDados()
	var existRenda int

	erroSelect := db.QueryRow(" select id from renda where id=? ", id).Scan(&existRenda)

	if erroSelect != nil {

		return 0, erroSelect.Error()
	}

	if existRenda != id {
		return 0, "Não foi encontrado"

	}

	result, err := db.Exec("delete from renda where id =?", id)

	if err != nil {
		return 0, err.Error()

	}

	row, errRow := result.RowsAffected()

	if errRow != nil {
		return 0, errRow.Error()
	}
	defer db.Close()
	return int(row), ""

}

func EditarRenda(id int, nome, tipo string, mes time.Time, usuarioId string, mensal bool, valor float64) (int64, string) {

	db := db.ConectaBancoDados()
	var existRenda int

	erroSelect := db.QueryRow(" select id from renda where id=? ", id).Scan(&existRenda)

	if erroSelect != nil {
		defer db.Close()
		return 0, erroSelect.Error()

	}

	if existRenda != id {
		defer db.Close()
		return 0, "Não foi encontrado"

	}

	updateString := "update renda set nome =? , tipo=?, mes=? , usuarioId = UUID_TO_BIN(\"" + usuarioId + "\"),mensal=? , valor=? where id=?"

	fmt.Println(updateString)
	update, errup := db.Prepare(updateString)

	if errup != nil {
		defer db.Close()
		return 0, errup.Error()
	}

	result, erroResult := update.Exec(nome, tipo, mes, mensal, valor, id)

	if erroResult != nil {
		defer db.Close()
		return 0, erroResult.Error()
	}

	row, errRow := result.RowsAffected()
	defer db.Close()
	if errRow != nil {
		return 0, errRow.Error()
	}

	return row, ""

}

func GetRendaData(mes time.Time, skip, take int, usuarioId string) (RendasAll, string) {

	db := db.ConectaBancoDados()

	selectString := "select id , nome , tipo ,valor , mensal, mes  from renda where usuarioId= UUID_TO_BIN(\"" + usuarioId + "\") and mes like \"%" + mes.Format("2006-01") + "%\" order by mes  limit ?,?"

	reusltSelec, errSelec := db.Query(selectString, skip, take)

	if errSelec != nil {
		panic(errSelec.Error())
	}

	r := Renda{}

	rendas := RendasAll{}
	for reusltSelec.Next() {
		var id int
		var nome, tipo string
		var valor float64
		var mensal bool
		var mes time.Time

		err := reusltSelec.Scan(&id, &nome, &tipo, &valor, &mensal, &mes)

		if err != nil {
			panic(err.Error())

		}
		r.Id = id
		r.Nome = nome
		r.Tipo = tipo
		r.Valor = valor
		r.Mensal = mensal
		r.Mes = mes

		rendas.Rendas = append(rendas.Rendas, r)
	}

	defer db.Close()

	errQts := db.QueryRow("select count(*) as qts from renda where usuarioId= UUID_TO_BIN(\""+usuarioId+"\") and mes like ?", "%"+mes.Format("2006-01")+"%").Scan(&rendas.Count)
	if errQts != nil {
		panic(errQts.Error())
	}

	return rendas, ""

}
