package routes

import (
	"APIFinancaPessoal/controllers"
	"APIFinancaPessoal/middleware"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func HandleResquest() {
	r := mux.NewRouter()
	r.Use(middleware.ContentTypeMiddleware)
	r.HandleFunc("/api/signin", controllers.Autenticar).Methods("POST")
	r.HandleFunc("/", controllers.Home).Methods("Get")
	r.HandleFunc("/api/usuario", middleware.AutorizarAcesso(controllers.CriaUsuario)).Methods("Post")
	r.HandleFunc("/api/usuario", controllers.ValidarLogin).Queries("login", "{login}").Methods("Get")
	r.HandleFunc("/api/usuario/{id}", middleware.AutorizarAcesso(controllers.GetUsuarioId)).Methods("Get")
	r.HandleFunc("/api/usuario/{id}", middleware.AutorizarAcesso(controllers.EditarUser)).Methods("Put")
	r.HandleFunc("/api/usuario/{id}", middleware.AutorizarAcesso(controllers.DeleteUser)).Methods("Delete")
	r.HandleFunc("/api/usuario", middleware.AutorizarAcesso(controllers.BusrcarPorNome)).Queries("skip", "{skip}").Queries("name", "{name}").Methods("Get")
	r.HandleFunc("/api/usuario", middleware.AutorizarAcesso(controllers.BuscarTodosUsuario)).Queries("skip", "{skip}").Methods("Get")
	r.HandleFunc("/api/renda", middleware.AutorizarAcesso(controllers.GetRendaData)).Queries("skip", "{skip}").Queries("data", "{data}").Queries("userID", "{userID}").Methods("Get")
	r.HandleFunc("/api/renda", middleware.AutorizarAcesso(controllers.SalvarRenda)).Methods("Post")
	r.HandleFunc("/api/renda", middleware.AutorizarAcesso(controllers.GetRendasAll)).Queries("skip", "{skip}").Queries("userID", "{userID}").Methods("Get")
	r.HandleFunc("/api/renda/{id}", middleware.AutorizarAcesso(controllers.GetRendaID)).Queries("userID", "{userID}").Methods("Get")
	r.HandleFunc("/api/renda/{id}", middleware.AutorizarAcesso(controllers.DeleteRenda)).Methods("Delete")
	r.HandleFunc("/api/renda/{id}", middleware.AutorizarAcesso(controllers.EditRenda)).Methods("PUT")

	c := cors.New(
		cors.Options{
			AllowedOrigins:   []string{"http://127.0.0.1", "http://127.0.0.1:5501"},
			AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut},
			AllowedHeaders:   []string{"Authorization-Token", "Content-type"},
			AllowCredentials: true,

			// Enable Debugging for testing, consider disabling in production
			Debug: true,
		}).Handler(r)

	log.Fatal(http.ListenAndServe(":8050", c))
}
