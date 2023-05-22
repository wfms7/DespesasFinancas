import { alertMensagens } from "../app/view/alertMensagem.js";
import { conectaAPIrenda } from "../app/conectaAPI/conectaAPIrenda.js";
import { tokenfunc } from "../Token.js";
import validarcampoRenda from "../app/view/income/validacaoFormulario.js";

const formulario = document.getElementById('renda_form');
const campoFumulario = document.querySelectorAll('[data-validar]')



async function salvarRenda(evento){
    try{
    let result = true
    let titulo = 'Renda'
    let mensagem = 'Registro da Renda salvo com sucesso'
    let status = 'sucesso'
    evento.preventDefault()
    const nomeRenda = document.getElementById('renda-nome')
    const tipoRenda = document.getElementById('renda-tipo')
    const  mensalRenda = document.getElementById('renda-mensal')
    const valorRenda = document.getElementById('renda-valor')
    const periodoInicio =  Date.parse( document.getElementById('renda-periodo-inicio').value +"T00:00") ;
    const periodoFim =  Date.parse(document.getElementById('renda-periodo-fim').value +"T00:00");
    let inicio = new Date(periodoInicio)
    let fim = new Date(periodoFim)
    const token =  tokenfunc.getToken()

   
 
    while(inicio <= fim){
     

       // let dataFormat = inicio.toLocaleDateString().replaceAll("/","-")
       let dataFormat = new Date(inicio).toISOString()

        let result =  await conectaAPIrenda.salvarRenda(nomeRenda.value,  tipoRenda.value,parseFloat( valorRenda.value),mensalRenda.checked, dataFormat,token.id)
       
        if (result > 0){
        inicio = new Date(inicio.setMonth(inicio.getMonth()+1))
        }else{
            result = false
            mensagem = `Ocorreu um erro ${result} `
            status = 'erro'
        inicio = new Date(fim.inicio(fim.getMonth()+1))
        }
     
    }
    if (result === true){
        setTimeout( function (){
            window.location.href = "../../page/renda.html"
        },3000)
    }

    alertMensagens.alertMensagem(titulo,mensagem,status)

    }catch(e){
        alertMensagens.alertMensagem('Erro',e,'erro')
    }
}




formulario.addEventListener("submit",(evento)=>{ salvarRenda(evento)})

campoFumulario.forEach((campo)=>{
   
    campo.addEventListener("blur",()=> validarcampoRenda(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})