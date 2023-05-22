package db

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func ConectaBancoDados() *sql.DB {
	conexao := "root:1234@tcp(localhost:3306)/financeiropessoal?parseTime=true"

	db, err := sql.Open("mysql", conexao)

	if err != nil {

		panic(err.Error())
	}
	return db
}
