package controllers

import (
	"APIFinancaPessoal/models"
	"encoding/json"
	"net/http"
)

func Autenticar(w http.ResponseWriter, r *http.Request) {
	var credencial models.Autenticar
	json.NewDecoder(r.Body).Decode(&credencial)

	user, err := models.AutenticarUser(credencial.Login, credencial.Senha)

	if err != "" {
		json.NewEncoder(w).Encode(err)
		return
	}

	if user.Id == "" && user.Nome == "" {
		err := "Não foi possivel logar "

		json.NewEncoder(w).Encode(err)
		return
	}

	jwtString, temp, erro := models.GerarJWT(user.Id, user.Nome)

	if erro != nil {
		json.NewEncoder(w).Encode(erro.Error())
	}

	var token models.Token
	token.Id = user.Id
	token.Nome = user.Nome
	token.Tempoex = temp
	token.TokenString = jwtString
	json.NewEncoder(w).Encode(token)

}
