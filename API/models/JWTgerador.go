package models

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type Token struct {
	Id          string `json:"id"`
	Nome        string `json:"nome"`
	Tempoex     int64  `json:"tempoex"`
	TokenString string `json:"token"`
}

func MyKey() []byte {

	myAssinatura := []byte("teste")
	return myAssinatura

}

func GerarJWT(id, nome string) (string, int64, error) {

	var myAssinatura = MyKey()

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["id"] = id
	claims["nome"] = nome
	tempoex := time.Now().Add(time.Hour * 5).Unix()
	fmt.Println(tempoex)
	claims["exp"] = tempoex

	tokenString, err := token.SignedString(myAssinatura)
	if err != nil {
		fmt.Errorf("Alguma coisa Errada: %s", err.Error())
		return "", 0, err
	}
	return tokenString, tempoex, nil

}
