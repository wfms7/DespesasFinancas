
import { tokenfunc } from "../../../Token.js";
import { conectaAPIrenda } from "../../conectaAPI/conectaAPIrenda.js";
import { editIncome } from "../../view/income/editIncome.js";
import {alertMensagens} from "../../view/alertMensagem.js"
const formIncome = document.getElementById('renda_form');
import validarcampoRenda from "../../view/income/validacaoFormulario.js"


class incomeControllerEdit{
    constructor(){
     
        this._token = tokenfunc.getToken();
        
    }


   async getDataIncomebyID(){

        const incomeData = await this.getByIdIncome(this.getIdURLIncome(),this._token.id)
        console.log(incomeData)
        const editView = new editIncome(this.getIdURLIncome(),this._token)
     
        editView.insertInputDataIncome(incomeData)
    }

    getIdURLIncome(){
        const url = window.location.search
        const parametroURL = new URLSearchParams(url) 
        const id = parametroURL.get("id")
        return id
    }

    async getByIdIncome(idIncome,idUser){

        const result = await conectaAPIrenda.getByIdIncome(idIncome,idUser);
        return result

    }

    async editIncome(event){
        event.preventDefault();
        const editView = new editIncome(this.getIdURLIncome(),this._token)

        const DataformIncome = editView.getDataInputIncome()
        console.log(DataformIncome)
        const resultEdit = await conectaAPIrenda.editIncome(DataformIncome)

        console.log(resultEdit)
        if(resultEdit>= 1)
        {
            alertMensagens.alertMensagem("Sucesso","Atualização Realizada com Sucesso","sucesso" )
        }

    }

}


const incomeGetAndEdit = new incomeControllerEdit();

incomeGetAndEdit.getDataIncomebyID()

formIncome.addEventListener("submit",(event)=>{ 
   incomeGetAndEdit.editIncome(event)


})

const camposDoFormulario = document.querySelectorAll('[data-validar]');

camposDoFormulario.forEach((campo)=>{
    console.log("Entrou ")
    campo.addEventListener("blur",()=> validarcampoRenda(campo))
    campo.addEventListener("invalid", event => event.preventDefault());
})