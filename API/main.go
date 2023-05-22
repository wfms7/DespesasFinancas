package main

import (
	"APIFinancaPessoal/db"
	"APIFinancaPessoal/routes"
	"fmt"
)

func main() {

	db.ConectaBancoDados()
	fmt.Println("Iniciando o servidor Rest com Go")
	routes.HandleResquest()
}
