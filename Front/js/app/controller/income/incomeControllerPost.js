import { income } from "../../model/income/income.js";
import { tokenfunc } from "../../../Token.js";
import { conectaAPIrenda } from "../../conectaAPI/conectaAPIrenda.js";
import { alertMensagens } from "../../view/alertMensagem.js";
const formIncome = document.getElementById('renda_form');
import validarcampoRenda from "../../view/income/validacaoFormulario.js"

class incomeControllerPost{
    constructor(){
        this._inputIncomeName = document.getElementById('renda-nome');
        this._inputIncomeType = document.getElementById('renda-tipo');
        this._inputMonthlyIncome = document.getElementById('renda-mensal');
        this._inputValueIncome = document.getElementById('renda-valor');
        this._inputStartPeriod =document.getElementById('renda-periodo-inicio');
        this._inputEndPeriod = document.getElementById('renda-periodo-fim');
        this._idUser = tokenfunc.getToken().id;
        this._affectedRows = 1;
        
    }

    
    async saveIncome(event){
        event.preventDefault();
              try{
                
                let startDate = new Date(Date.parse(this._inputStartPeriod.value +"T00:00"));
                let endDate = new Date(Date.parse(this._inputEndPeriod.value+"T00:00"));
                let reuslt 
                let insertDate =[]

                while(startDate<=endDate){
                   console.log(this._idUser)
                  const incomeObject = new income(
                        null,
                        this._inputIncomeName.value,
                        this._inputIncomeType.value,
                        this._inputMonthlyIncome.checked,
                        this._inputValueIncome.value,
                        startDate,
                        endDate,
                        this._idUser
                    )
                 

                    reuslt   = await conectaAPIrenda.saveIncome(incomeObject)
                   
                  
                    if(reuslt>0){

                        insertDate.push(this.insertMesagem(incomeObject , true))
                        startDate = new Date(startDate.setMonth( (startDate.getMonth()+1)))
                        
                    }
                    else{
                        insertDate.push(this.insertMesagem(incomeObject, false))
                        startDate = new Date(endDate.setMonth((endDate.getMonth+1)))
                       
                    }
                   
                 
                }

                this._messageAlert(reuslt ,insertDate)
                this.clearInput()


              }
              catch(err){
                console.log(err)
                this._messageAlert(err,[])
              }



    }

    _messageAlert(result , insertDate){
        let message =""
        insertDate.forEach(Element =>  message += Element )
        
       
        result === this._affectedRows ?  alertMensagens.alertMensagem("Registro Salvo",`Salvo com sucesso: ${message}`,"sucesso"):
        alertMensagens.alertMensagem("Erro",result,"erro")

        
    }

    insertMesagem(income,okOrNot){
        

         let successoErro = okOrNot === true ? "Salvo com sucesso: " : "Ocorreu um erro: "
         
         let message = `<br> ${successoErro}  ${income.incomeName}  no periodo: ${income.startPeriod.toLocaleString("pt-br",{month:"long" ,year:"numeric"})} <br> `
         console.log(message)
         return message
    }

    clearInput(){
        this._inputIncomeName.value ="";
        this._inputIncomeType.value="Fixa"
        this._inputMonthlyIncome.checked= false
        this._inputValueIncome.value =""
        this._inputStartPeriod.value = ""
        this._inputEndPeriod.value=""
        this._inputIncomeName.focus()
        

    }



}


const camposDoFormulario = document.querySelectorAll('[data-validar]');


formIncome.addEventListener("submit",(event)=>{ 
     new incomeControllerPost().saveIncome(event)
})

camposDoFormulario.forEach((campo)=>{
    campo.addEventListener("blur",()=> validarcampoRenda(campo))
    campo.addEventListener("invalid", event => event.preventDefault());
})