package controllers

import (
	"APIFinancaPessoal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Home Page")
}

func CriaUsuario(w http.ResponseWriter, r *http.Request) {
	var novoUser models.Usuario
	json.NewDecoder(r.Body).Decode(&novoUser)
	nome := novoUser.Nome
	var nomeMae = novoUser.Nomemae
	var email = novoUser.Email
	var login = novoUser.Login
	var senha = novoUser.Senha
	var datanascimento = novoUser.Datanascimento

	fmt.Println()

	reuslt, err := models.CriaUsuario(nome, nomeMae, email, login, senha, datanascimento)

	if err != "" {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(err)
	} else {

		json.NewEncoder(w).Encode(reuslt)
	}
}

func BuscarTodosUsuario(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Entrou")
	vars := mux.Vars(r)
	skip, errConvert := strconv.Atoi(vars["skip"])
	if errConvert != nil {
		panic(errConvert.Error())
	}

	todosUsuaarios := models.BuscarTodosUsuario(skip, 10)

	json.NewEncoder(w).Encode(todosUsuaarios)
	//	Encode(todosUsuaarios)

}

func ValidarLogin(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	login := vars["login"]

	result := models.ValidarLogin(login)
	json.NewEncoder(w).Encode(result)
}

func GetUsuarioId(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	//fmt.Println(id)

	result, erro := models.GetUserId(id)

	if erro != "" {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(erro)

	} else {
		json.NewEncoder(w).Encode(result)
	}

}

func EditarUser(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"]

	var atualizarUser models.Usuario
	json.NewDecoder(r.Body).Decode(&atualizarUser)

	nome := atualizarUser.Nome
	nomeMae := atualizarUser.Nomemae
	email := atualizarUser.Email
	login := atualizarUser.Login
	dataNascimento := atualizarUser.Datanascimento

	result, erro := models.EditarUsuario(id, nome, nomeMae, email, login, dataNascimento)

	if erro != "" {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(erro)
	} else {
		json.NewEncoder(w).Encode(result)
	}

}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	result, err := models.DeletarUser(id)

	if err != "" {
		json.NewEncoder(w).Encode(err)
	} else {

		json.NewEncoder(w).Encode(result)
	}

}

func BusrcarPorNome(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	nome := vars["name"]

	skip, errConvert := strconv.Atoi(vars["skip"])
	if errConvert != nil {
		panic(errConvert.Error())
	}

	result := models.BucarUsuariosporNome(skip, 10, nome)

	json.NewEncoder(w).Encode(result)

}
