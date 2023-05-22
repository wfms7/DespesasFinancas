package models

import (
	"APIFinancaPessoal/db"
	"fmt"
)

type Usuario struct {
	Id             string `json:"id"`
	Nome           string `json:"nome"`
	Nomemae        string `json:"nomeMae"`
	Datanascimento string `json:"dataNascimento"`
	Email          string `json:"email"`
	Login          string `json:"login"`
	Senha          string `json:"senha"`
}

type GetUsuarios struct {
	Usuarios []struct {
		Id             string `json:"id"`
		Nome           string `json:"nome"`
		Nomemae        string `json:"nomeMae"`
		Datanascimento string `json:"dataNascimento"`
		Email          string `json:"email"`
		Login          string `json:"login"`
		Senha          string `json:"senha"`
	} `json:"usuarios"`

	Count int `json:"count"`
}

func CriaUsuario(nome, nomemae, email, login, senha string, datanascimento string) (int64, string) {

	db := db.ConectaBancoDados()

	insertDB, err := db.Prepare("insert into usuario(nome,nome_mae,data_nascimento ,email,login,senha)value(?, ?, ?, ?,?, MD5(?))")

	if err != nil {
		panic(err.Error())
	}

	result, err := insertDB.Exec(nome, nomemae, datanascimento, email, login, senha)

	if err != nil {

		return 0, err.Error()
	}

	post, errpostId := result.RowsAffected()

	if errpostId != nil {
		return 0, errpostId.Error()

	}

	defer db.Close()
	return post, ""

}

func BuscarTodosUsuario(skip, take int) GetUsuarios {

	db := db.ConectaBancoDados()

	selectUsuario, err := db.Query("select BIN_TO_UUID(id) as id ,nome , nome_mae ,email ,login from usuario order by datacriado  limit ?, ? ", skip, take)

	if err != nil {
		panic(err.Error())
	}

	u := Usuario{}

	usuarios := GetUsuarios{}

	for selectUsuario.Next() {
		var id string
		var nome, nomemae, email, login string

		err := selectUsuario.Scan(&id, &nome, &nomemae, &email, &login)

		if err != nil {
			panic(err.Error())
		}

		u.Id = id
		u.Nome = nome
		u.Nomemae = nomemae
		u.Email = email
		u.Login = login

		usuarios.Usuarios = append(usuarios.Usuarios, u)

	}

	defer db.Close()

	errQts := db.QueryRow("select count(*) as qts from usuario ").Scan(&usuarios.Count)

	if errQts != nil {
		panic(err.Error())
	}

	return usuarios

}

func ValidarLogin(login string) int {
	db := db.ConectaBancoDados()

	var qts int
	err := db.QueryRow("select count(login) as qts from usuario where  login = ?", login).Scan(&qts)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	return qts
}

func GetUserId(id string) (Usuario, string) {
	db := db.ConectaBancoDados()
	var usuario Usuario
	selectString := "select BIN_TO_UUID(id) as id ,nome , nome_mae ,data_nascimento, email ,login from usuario where id =" + "UUID_TO_BIN(\"" + id + "\")"

	err := db.QueryRow(selectString).Scan(&usuario.Id, &usuario.Nome, &usuario.Nomemae, &usuario.Datanascimento, &usuario.Email, &usuario.Login)

	if err != nil {

		return usuario, err.Error()
	}

	defer db.Close()

	return usuario, ""

}

func EditarUsuario(id, nome, nomemae, email, login string, datanascimento string) (int64, string) {

	db := db.ConectaBancoDados()
	var existUser string

	selectString := "select BIN_TO_UUID(id ) as id from usuario where id = UUID_TO_BIN(\"" + id + "\")"

	err := db.QueryRow(selectString).Scan(&existUser)
	fmt.Println(existUser)
	if err != nil {

		return 0, err.Error()
	}

	if existUser == "null" {
		defer db.Close()
		return 0, "Erro id não encontrado"
	} else if existUser != id {
		defer db.Close()
		return 0, "Erro id não encontrado  aaa"
	}
	defer db.Close()

	update, erroUp := db.Prepare("update usuario set nome=?, nome_mae=? ,email=?,data_nascimento=? where id=UUID_TO_BIN(\"" + id + "\")")

	if erroUp != nil {

		return 0, erroUp.Error()
	}

	result, errRsult := update.Exec(nome, nomemae, email, datanascimento)

	if errRsult != nil {

		return 0, errRsult.Error()
	}

	RowsAffected, errRow := result.RowsAffected()
	defer db.Close()
	if errRow != nil {
		return 0, errRow.Error()
	}
	fmt.Println(RowsAffected)
	return RowsAffected, ""
}

func DeletarUser(id string) (int64, string) {

	db := db.ConectaBancoDados()
	var existUser string

	selectString := "select BIN_TO_UUID( id ) as id  from usuario where id =UUID_TO_BIN(\"" + id + "\")"

	errexiste := db.QueryRow(selectString).Scan(&existUser)

	if errexiste != nil {
		return 0, errexiste.Error()
	}

	result, err := db.Exec("delete from usuario where id =UUID_TO_BIN(\"" + id + "\")")
	if err != nil {
		return 0, err.Error()
	}

	RowsAffected, errRow := result.RowsAffected()

	if errRow != nil {
		return 0, errRow.Error()
	}
	defer db.Close()

	return RowsAffected, ""

}

func BucarUsuariosporNome(skip, take int, nome string) GetUsuarios {
	db := db.ConectaBancoDados()

	selectUsuario, err := db.Query("select BIN_TO_UUID(id) as id,nome,nome_mae,email,login from usuario where nome like ?  order by id limit ?,?", "%"+nome+"%", skip, take)

	if err != nil {

		panic(err.Error())
	}

	u := Usuario{}

	usuarios := GetUsuarios{}

	for selectUsuario.Next() {
		var id string
		var nome, nomemae, email, login string

		err := selectUsuario.Scan(&id, &nome, &nomemae, &email, &login)

		if err != nil {
			panic(err.Error())
		}

		u.Id = id
		u.Nome = nome
		u.Nomemae = nomemae
		u.Email = email
		u.Login = login

		usuarios.Usuarios = append(usuarios.Usuarios, u)

	}

	defer db.Close()

	errQts := db.QueryRow("select count(*) as qts from usuario where nome like ?", "%"+nome+"%").Scan(&usuarios.Count)

	if errQts != nil {
		panic(errQts.Error())
	}

	return usuarios

}
