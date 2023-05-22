import { conectaAPIusuario } from "../../conectaAPI/conectaAPIusuario.js"
import { alertMensagens } from "../../view/alertMensagem.js";
class userControllerDeleta{
    constructor(){
        this._affectedRows = 1;
      
    }

   async deleteUser(idUser){

      const result =  await conectaAPIusuario.deleteUser(idUser);
      this._messageAlert(result);
      

      setTimeout( function(){ document.location.reload(true);},2000)
       
    }

    _messageAlert(result){
       
        result === this._affectedRows ?  alertMensagens.alertMensagem("Registro Deletado","Usuario Deletado com sucesso","sucesso"):
        alertMensagens.alertMensagem("Erro",result,"erro");

    }

}

export{userControllerDeleta}