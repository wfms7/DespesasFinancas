package middleware

import (
	"APIFinancaPessoal/models"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt"
)

func ContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func AutorizarAcesso(handler http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Validando")

		if r.Header["Authorization-Token"] == nil {

			err := "Não foi encontrado Token"
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}

		var myAssinatura = models.MyKey()

		token, err := jwt.Parse(r.Header["Authorization-Token"][0], func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Houve um erro no Parsing")
			}
			return myAssinatura, nil
		})

		if err != nil {
			erro := "Seu Token esta expirado"
			json.NewEncoder(w).Encode(erro)
			return
		}

		if token.Valid {
			fmt.Println("valido")
			handler.ServeHTTP(w, r)
			return
		}
		fmt.Println("não valido")

		resposta := "Não Autorizado"
		json.NewEncoder(w).Encode(resposta)

	}

}
