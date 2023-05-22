import { tokenfunc } from "../../../Token.js";
import { conectaAPIrenda } from "../../conectaAPI/conectaAPIrenda.js";
import { DateHelpers } from "../../helpers/DateHelpers.js";
import { tableIncome } from "../../view/income/tableIncome.js";
import { pagination } from "../../view/pagination.js";
import { alertDeleteIncome } from "../../view/income/alertDeleteIncome.js";
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const btnSearch = document.getElementById('btnBuscarPorInput');
const btnClearInput = document.getElementById('btnlimparCampo');

const startSkip = 0
const startPage = 1
class incomeControllerGet{
    constructor(){
        this._sectionDefault = document.querySelector('[data-pricipal]');
        this._totalRow = document.getElementById('total-linhas')
        this._inputSearch = document.getElementById('buscaInput');
        this._pageNumber = document.getElementById('numero-pagina');
        this._token = tokenfunc.getToken();
        this.pag = new pagination()
        this._dateHelp = new DateHelpers()
        this._alertDeleteIncome = new alertDeleteIncome();
        

    }

    async getAllincome(skip,page){

        const income = await conectaAPIrenda.getAllIncome(skip,this._token.id)
      
        const table = new tableIncome()

        this._sectionDefault.innerHTML ="";

        this._sectionDefault.innerHTML =   table.createTable(income)
        this.setTotalrows(income.count);
        this.setPageNumber(page);
        this.btnIshidden();
        this.btnDelete();
    }


    async getByDate(skip,page ){

        const incomeResult = await conectaAPIrenda.getByDate(skip,this._dateHelp.convertToSearchDate( this._inputSearch.value) ,this._token.id)
        
        const table = new tableIncome()

        this._sectionDefault.innerHTML ="";

        this._sectionDefault.innerHTML =   table.createTable(incomeResult)
        this.setTotalrows(incomeResult.count);
        this.setPageNumber(page)
        this.btnIshidden()
        this.btnDelete();
    }


   



    setTotalrows(row){
        this._totalRow.innerText= row
    }

    setPageNumber(page){
        this._pageNumber.innerText = page

    }

    pageBack(){
       
       let newPage =  this.pag.pageBack(parseInt(this._pageNumber.innerText))
      
       let newSkip=  this.pag.skipBack(parseInt(newPage))
       
      if( this._inputSearch.value !=""){
      this.getByDate(newSkip,newPage)
      }
      else{
        this.getAllincome(newSkip,newPage)
      }
      

        

    }

  

    pageNext(){
       
        let newPage =  this.pag.nextPage(parseInt( this._pageNumber.innerText),parseInt(this._totalRow.innerText))
       
        let newSkip=  this.pag.skipNext(parseInt(newPage))
        
    


        if( this._inputSearch.value !=""){
            this.getByDate(newSkip,newPage)
        }else{
            this.getAllincome(newSkip,newPage)
        }

       
       
    }

    btnIshidden(){
        let btnleftHiden = this.pag.leftButtonActiveOrNot(parseInt( this._pageNumber.innerText))
        let btnRightHiden = this.pag.rightButtonActiveOrNot(parseInt(this._pageNumber.innerText),parseInt(this._totalRow.innerText))
      
        btnLeft.style.opacity = btnleftHiden
        btnRight.style.opacity  = btnRightHiden
  
    }
    
    clearInput(){
      
        this._inputSearch.value =``
        this.getAllincome(startSkip,startPage)

    }

    btnDelete(){
        const btnDelete = document.querySelectorAll('[data-btndelete]');

        btnDelete.forEach( (btn)=>{
            btn.addEventListener("click",async()=>{
                
                const incomeResult = await conectaAPIrenda.getByIdIncome(btn.dataset.btndelete,tokenfunc.getToken().id)
                console.log(incomeResult)
                this._alertDeleteIncome.alertDelete(incomeResult)
            })
        })
    }


}


const incomeGet = new incomeControllerGet();

incomeGet.getAllincome(startSkip, startPage)
btnLeft.addEventListener('click',()=>{incomeGet.pageBack()})
btnRight.addEventListener('click',()=>{incomeGet.pageNext()})
btnClearInput.addEventListener('click',()=>{ incomeGet.clearInput()})
btnSearch.addEventListener('click', ()=>{incomeGet.getByDate(startSkip,startPage)})


export {incomeControllerGet}