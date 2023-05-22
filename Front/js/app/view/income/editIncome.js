import { DateHelpers } from "../../helpers/DateHelpers.js";
import { income } from "../../model/income/income.js";

class editIncome{
    constructor(idIncome, token){
        this._id = idIncome
        this._token = token
        this._inputIncomeName = document.getElementById("renda-nome");
        this._inputIncomeType = document.getElementById("renda-tipo");
        this._inputMonthlyIncome = document.getElementById("renda-mensal");
        this._inputValueIncome = document.getElementById("renda-valor");
        this._inputPeriod = document.getElementById("renda-periodo-inicio");
        this.dateHelp = new DateHelpers() 
    }

    insertInputDataIncome(incomeData){
    
        this._inputIncomeName.value = incomeData.nome;
        this._inputIncomeType.value = incomeData.tipo;
        this._inputMonthlyIncome.checked = incomeData.mensal;
        this._inputPeriod.value= this.dateHelp.dateToText( incomeData.mes);
        this._inputValueIncome.value = incomeData.valor.toFixed(2)

    }

    getDataInputIncome(){

     
        let startDate = new Date(Date.parse(this._inputPeriod.value +"T00:00"));
       
        const incomeEdit = new income(this._id,
            this._inputIncomeName.value ,
            this._inputIncomeType.value ,
            this._inputMonthlyIncome.checked ,
            this._inputValueIncome.value,
            startDate,
            null,
            this._token.id
            
        )

       return  incomeEdit
         
    }

}

export{editIncome}