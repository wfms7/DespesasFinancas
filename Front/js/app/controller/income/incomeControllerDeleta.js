import { conectaAPIrenda } from "../../conectaAPI/conectaAPIrenda.js";
import { alertMensagens } from "../../view/alertMensagem.js";
 
class incomeControllerDeleta{
    constructor(){
        this._affectedRows = 1;
    }

    async deleteIncome(incomeId){

        const result = await conectaAPIrenda.deletarRenda(incomeId);
        
        this._messageAlert(result);
        setTimeout( function(){ document.location.reload(true);},2000)
    }

    _messageAlert(result){
       
        result === this._affectedRows ?  alertMensagens.alertMensagem("Registro Deletado","Usuario Deletado com sucesso","sucesso"):
        alertMensagens.alertMensagem("Erro",result,"erro");

    }
}

export{incomeControllerDeleta}