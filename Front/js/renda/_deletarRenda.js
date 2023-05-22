import {tokenfunc} from "../Token.js"
import {getRendasall} from "./_getRendas.js"
import { conectaAPIrenda } from "../app/conectaAPI/conectaAPIrenda.js";
import { alertMensagens } from "../app/view/alertMensagem.js";
const deletetag = document.querySelector('[data-deletetag]')


async function alertDelete(id){

    const renda =await  getRendaIdDeletar(id);

    let mesConvertido = new Date(renda.mes)
    const periodo = new Date(mesConvertido).toLocaleString("pt-br",{month:"long", year:"numeric"}) 

    deletetag.innerHTML = `
    <div class="delete__container ">
    <div class="delete__conteiner-box show">
        <h2 class="deletar__titulo">Deletar</h2>
        <p class="deletar__texto">Tem certeza que quer deletar a Renda:</p>
        <label for="" class="deleta__iformacao delete-negrito" id="nomeUser-delete">${renda.nome}</label>
        <label for="" class="deleta__iformacao" id="nomemaeUser-delete">Tipo: ${renda.tipo}</label>
        <label for="" class="deleta__iformacao"id="emailUser-delete"> Valor: ${renda.valor}</label>
        <label for="" class="deleta__iformacao"id="loginUser-delete">Periodo: ${periodo}</label>
        <div class="delete__container-botao">                
             <button class="button-principal delete__button" id="btn-delete-sim" data-iddelete="${id}">Sim</button>
             <button class="button-principal delete__button" id="btn-delete-nao">Não</button>
        </div>
     </div>
    </div>


    `
    btncloseAlertDelete()
    deletarRenda()
}







export default function btnDelete(){
    const BtnDelete = document.querySelectorAll('[data-btndelete]')

    BtnDelete.forEach((btn) =>{
        btn.addEventListener('click',()=>{alertDelete(btn.dataset.btndelete)})
    })
}


async function getRendaIdDeletar(id){
    const userID = tokenfunc.getToken()
    const Renda= await conectaAPIrenda.getRendaId(id, userID.id) 

    return Renda
}


function btncloseAlertDelete(){

    const cancelarDelete = document.getElementById('btn-delete-nao');

    cancelarDelete.addEventListener('click',()=>{
    
        deletetag.innerHTML = ``
    })

}


function deletarRenda(){

    const btnDeletar = document.querySelector('[data-iddelete]')
    btnDeletar.addEventListener('click',async ()=>{

        const result = await conectaAPIrenda.deletarRenda(btnDeletar.dataset.iddelete)

        if(result>0){
            window.scrollTo(0, 0);
            deletetag.innerHTML=``;
            alertMensagens.alertMensagem("Delete", "Delete Realizado com sucesso", "sucesso" )
            getRendasall.getRendas(0)
            setTimeout( function(){ alertMensagens.closeAlert()},2000)
        }

    } )

}