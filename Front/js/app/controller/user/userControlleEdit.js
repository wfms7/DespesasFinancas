import { conectaAPIusuario } from "../../conectaAPI/conectaAPIusuario.js";
import { editUser } from "../../view/user/editUser.js";
import  verificandoCampo from "../../view/user/validateFormUser.js"
import { alertMensagens } from "../../view/alertMensagem.js";
const formUser  = document.getElementById('form-user');
const camposDoFormulario = document.querySelectorAll('[data-validar]');

class userControlerEdit{

    constructor(){
        this._userId = 0
        this._editeUser = new editUser()
        this._affectedRows = 1;
    }


    async getUserByID(){
        this._userId = this.getUserIdUrl();
        const DataUsers =  await conectaAPIusuario.getUserByID(this._userId);
       
        this._editeUser.insertDataIntoInput(DataUsers);
 
    }


    getUserIdUrl(){
        const url = window.location.search;
        const parameterURL = new URLSearchParams(url);
        const idUser = parameterURL.get('id');
      
        return idUser;
    }

    async editUser(event){
        event.preventDefault()
        const usarData = this._editeUser.getFormData(this.getUserIdUrl())
        
        const resultEdit = await conectaAPIusuario.editUser(usarData)
        this._messageAlert(resultEdit)

    }


    _messageAlert(result){
       
        result === this._affectedRows ?  alertMensagens.alertMensagem("Registro Atualizado","Usuario Atualizado com sucesso","sucesso"):
        alertMensagens.alertMensagem("Erro",result,"erro")

    }

}

const users = new userControlerEdit()
users.getUserByID()

formUser.addEventListener('submit', event => users.editUser(event))

camposDoFormulario.forEach((campo)=>{


    campo.addEventListener("blur",()=> verificandoCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
    

   

})