package controllers

import (
	"APIFinancaPessoal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

func SalvarRenda(w http.ResponseWriter, r *http.Request) {
	var rendaDados models.Renda

	json.NewDecoder(r.Body).Decode(&rendaDados)

	result, err := models.SalvarRenda(rendaDados.Nome, rendaDados.Tipo, rendaDados.Mes, rendaDados.UsuarioId, rendaDados.Mensal, rendaDados.Valor)

	if err != "" {
		json.NewEncoder(w).Encode(err)
	} else {
		json.NewEncoder(w).Encode(result)
	}
}

func GetRendasAll(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	skip, errConvert := strconv.Atoi(vars["skip"])
	usuarioID := vars["userID"]

	if errConvert != nil {
		panic(errConvert.Error())
	}

	rendas := models.GetAllRenda(skip, 10, usuarioID)

	json.NewEncoder(w).Encode(rendas)

}

func GetRendaID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	usuarioId := vars["userID"]
	id, err := strconv.Atoi(vars["id"])

	if err != nil {
		erro := err.Error()
		json.NewEncoder(w).Encode(erro)
		return
	}

	result, erro := models.GetRendaID(id, usuarioId)

	if erro != "" {
		json.NewEncoder(w).Encode(erro)
		return
	}

	json.NewEncoder(w).Encode(result)

}

func DeleteRenda(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		json.NewEncoder(w).Encode(err.Error())
		return

	}

	result, errResult := models.DeleteRenda(id)

	if errResult != "" {

		json.NewEncoder(w).Encode(errResult)
		return
	}

	json.NewEncoder(w).Encode(result)

}

func EditRenda(w http.ResponseWriter, r *http.Request) {
	var rendaInfo models.Renda
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])

	if err != nil {
		json.NewEncoder(w).Encode(err.Error())
		return

	}

	json.NewDecoder(r.Body).Decode(&rendaInfo)

	result, erroResult := models.EditarRenda(id, rendaInfo.Nome, rendaInfo.Tipo, rendaInfo.Mes, rendaInfo.UsuarioId, rendaInfo.Mensal, rendaInfo.Valor)

	if erroResult != "" {
		json.NewEncoder(w).Encode(erroResult)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func GetRendaData(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	skip, errSkip := strconv.Atoi(vars["skip"])

	if errSkip != nil {
		json.NewEncoder(w).Encode(errSkip.Error())
		return
	}

	dataBuscar, errData := time.Parse("2006/01", vars["data"])
	fmt.Println(dataBuscar)

	if errData != nil {
		json.NewEncoder(w).Encode(errData.Error())
		return
	}

	usuarioId := vars["userID"]

	result, erro := models.GetRendaData(dataBuscar, skip, 10, usuarioId)

	if erro != "" {
		json.NewEncoder(w).Encode(erro)
		return
	}

	json.NewEncoder(w).Encode(result)

}
