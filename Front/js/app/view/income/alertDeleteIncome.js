import {DateHelpers}from "../../helpers/DateHelpers.js"
import { incomeControllerDeleta } from "../../controller/income/incomeControllerDeleta.js";
class alertDeleteIncome {
    constructor(){
        this.tagDelete = document.querySelector("[data-deletetag]")
        this._convertDate = new DateHelpers();
        this._incomeControllerDelete = new incomeControllerDeleta();
    }


    alertDelete(renda){
     
        this.tagDelete.innerHTML = `
        <div class="delete__container ">
        <div class="delete__conteiner-box show">
        <h2 class="deletar__titulo">Deletar</h2>
        <p class="deletar__texto">Tem certeza que quer deletar a Renda:</p>
        <label for="" class="deleta__iformacao delete-negrito" id="nomeUser-delete">${renda.nome}</label>
        <label for="" class="deleta__iformacao" id="nomemaeUser-delete">Tipo: ${renda.tipo}</label>
        <label for="" class="deleta__iformacao"id="emailUser-delete"> Valor: ${renda.valor}</label>
        <label for="" class="deleta__iformacao"id="loginUser-delete">Periodo: ${this._convertDate.convertDateToBRonlyMonthYear(renda.mes)}</label>
        <div class="delete__container-botao">                
             <button class="button-principal delete__button" id="btn-delete-sim" data-iddelete="${renda.id}">Sim</button>
             <button class="button-principal delete__button" id="btn-delete-nao">Não</button>
        </div>
     </div>
    </div>
        `;

       this.btncloseAlertDelete();
        this.deletarIncome();
    }
   
    btncloseAlertDelete() {
        const cancelDelete = document.getElementById("btn-delete-nao");
    
        cancelDelete.addEventListener("click", () => {
          this.tagDelete.innerHTML = ``;
        });
      }
      
      deletarIncome(){
        const btnDeletar = document.getElementById('btn-delete-sim');
        console.log("delete")
        btnDeletar.addEventListener("click", ()=>{
           this._incomeControllerDelete.deleteIncome(btnDeletar.dataset.iddelete);
           this.tagDelete.innerHTML = ``;
        })
      }


}

export {alertDeleteIncome};