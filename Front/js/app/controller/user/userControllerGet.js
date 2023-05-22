import { conectaAPIusuario } from "../../conectaAPI/conectaAPIusuario.js";
import { ListUser } from "../../model/user/listUser.js";
import { pagination } from "../../view/pagination.js";
import { alertDelete } from "../../view/user/alertDelete.js";
import { tableUser } from "../../view/user/tableUser.js";
const startSkip = 0
const startPage = 1
const btnSearch = document.getElementById('btnBuscarPorInput');
const btnClearInput = document.getElementById('btnlimparCampo');
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

class userControllerGet{
    constructor(){
        
        this._listUser = new ListUser();
        this._sectionDefault = document.querySelector('[data-pricipal]');
        this._totalRow = document.getElementById('total-linhas')
        this._inputSearch = document.getElementById('buscaInput');
        this._pageNumber = document.getElementById('numero-pagina');
        this.pag = new pagination()
         this._alertDelete = new alertDelete()
        
    }

    async getAllUser(skip , page){
        const resultSearchUser =await conectaAPIusuario.getAllUser(skip)
     
       
        const table = new tableUser()
        this._sectionDefault.innerHTML =``

        this._sectionDefault.innerHTML = table.createTable(resultSearchUser);
       
        this.setTotalrows(resultSearchUser.count);
        this.setPageNumber(page)
        this.btnIshidden()
        this.btnDelete()


    }

    async getByName(skip , page ){

        const resultSearchUser  = await conectaAPIusuario.getByName(skip, this._inputSearch.value)
        const table = new tableUser()
        this._sectionDefault.innerHTML =``

        this._sectionDefault.innerHTML = table.createTable(resultSearchUser);
        
        this.setTotalrows(resultSearchUser.count);
        this.setPageNumber(page)
        this.btnIshidden()
        this.btnDelete()
    }

    async getUserByID(userID){
       
        return  await conectaAPIusuario.getUserByID(userID);
        
 
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
      this.getByName(newSkip,newPage)
      }
      else{
        this.getAllUser(newSkip,newPage)
      }
      

        

    }

  

    pageNext(){
       
        let newPage =  this.pag.nextPage(parseInt( this._pageNumber.innerText),parseInt(this._totalRow.innerText))
       
        let newSkip=  this.pag.skipNext(parseInt(newPage))
        
  


        if( this._inputSearch.value !=""){
            this.getByName(newSkip,newPage)
        }else{
            this.getAllUser(newSkip,newPage)
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
        this.getAllUser(startSkip,startPage)

    }

    btnDelete(){
        const Btndelete = document.querySelectorAll('[data-btndelete]');
      
         
     
         Btndelete.forEach((infoBTN)=>{
            infoBTN.addEventListener("click", async()=>{
               
                const usarData = await this.getUserByID(infoBTN.dataset.btndelete);
                this._alertDelete.alertDelete(usarData)
            })
         } )
                    
     
    }
    
}


const UserGet = new  userControllerGet();

UserGet.getAllUser(startSkip,startPage)



btnLeft.addEventListener('click',()=>{UserGet.pageBack()})
btnRight.addEventListener('click',()=>{UserGet.pageNext()})
btnClearInput.addEventListener('click',()=>{ UserGet.clearInput()})
btnSearch.addEventListener('click', ()=>{UserGet.getByName(startSkip,startPage)})


export{userControllerGet}

