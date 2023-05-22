import { alertMensagens } from "../../view/alertMensagem.js";

import { conectaAPIusuario } from "../../conectaAPI/conectaAPIusuario.js"; 
import { User } from "../../model/user/user.js";
import  validateform from "../../view/user/validateFormUser.js"

class userController{

    constructor(){
        this._inputName = document.getElementById('nomeuser');
        this._inputMotherSname = document.getElementById('nomemaeuser');
        this._inputDateOfBirth = document.getElementById('dataNascimentouser');
        this._inputUserEmail = document.getElementById('emailuser');
        this._inputUserLogin = document.getElementById('loginuser');
        this._inputPasswors = document.getElementById('senhauser');
        this._affectedRows = 1;
       
    }

    

    async createNewUser(event){
        event.preventDefault()

        try{
            let usernew = new User(
                0,
                this._inputName.value, 
                this._inputMotherSname.value, 
                this._inputDateOfBirth.value,
                this._inputUserEmail.value,
                this._inputUserLogin.value,
                this._inputPasswors.value
            )
            
            let result = await conectaAPIusuario.createNewUser(usernew);
            this._messageAlert(result)
            if(result === this._affectedRows){
                setTimeout( function (){
                    window.location.href = "../../../../page/usuario.html"
                },1500)
            }

            
        }catch(err){
            
        }
    }

    _messageAlert(result){
       
        result === this._affectedRows ?  alertMensagens.alertMensagem("Registro Salvo","Usuario Criado com sucesso","sucesso"):
        alertMensagens.alertMensagem("Erro",result,"erro")

    }


}
const camposDoFormulario = document.querySelectorAll('[data-validar]');
const  formUser = document.getElementById('form-user');



formUser.addEventListener("submit",(event) => {
    let UserController = new userController()
     
    UserController.createNewUser(event);   
})

camposDoFormulario.forEach((campo)=>{
    campo.addEventListener("blur",()=> validateform(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());

})

