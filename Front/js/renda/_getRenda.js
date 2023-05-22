import { conectaAPIrenda } from "../app/conectaAPI/conectaAPIrenda.js";
import {tokenfunc} from "../Token.js"

async function getrenda(){
   
    const id = getIDRenda()
    const token = tokenfunc.getToken()
    const nome = document.getElementById("renda-nome")
    const tipo = document.getElementById("renda-tipo")
    const mensal = document.getElementById("renda-mensal")
    const  periodo = document.getElementById("renda-periodo-inicio")
    const  valor = document.getElementById("renda-valor")

    const result =await  conectaAPIrenda.getRendaId(id,token.id)
    let dia = new Date(result.mes).toLocaleString("pt-br",{   day:"2-digit" ,timeZone: 'UTC'})
   let mes = new Date(result.mes).toLocaleString("pt-br",{   month:"2-digit" ,timeZone: 'UTC'})
   let ano   = new Date(result.mes).toLocaleString("pt-br",{   year:"numeric" ,timeZone: 'UTC'})
  
    nome.value = result.nome
    tipo.value = result.tipo
    mensal.checked = result.mensal
    periodo.value = ano +"-"+ mes+"-"+dia
   // periodo.value = dataConvert.getFullYear() +"-"+ ("0"+ (dataConvert.getMonth()+1)).slice(-2)+"-"+ ("0"+dataConvert.getDay()).slice(-2)
    valor.value = result.valor.toFixed(2)


}

function getIDRenda(){
    const url = window.location.search
    const parametroURL = new URLSearchParams(url) 
    const id = parametroURL.get("id")
    return id
}

getrenda()