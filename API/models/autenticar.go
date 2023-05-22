package models

import "APIFinancaPessoal/db"

type Autenticar struct {
	Login string `json:"login"`
	Senha string `json:"senha"`
}

func AutenticarUser(login, senha string) (Usuario, string) {

	db := db.ConectaBancoDados()

	var user Usuario

	err := db.QueryRow("select BIN_TO_UUID(id) as id , nome from usuario where login = ? and senha =MD5(?)", login, senha).Scan(&user.Id, &user.Nome)

	if err != nil {

		return user, err.Error()
	}

	return user, ""

}
