import {  tokenfunc } from "../../../Token.js";

const bemvindo = document.getElementById('bemvindo')


function getfistName(){

    const token = tokenfunc.getToken()
    let datenow = new Date()
    let saudacao = ""
     let datahora =  datenow.toLocaleDateString('pt-br',{hour:"numeric",hour12: true}).split(" ")

     if( datahora[2]==="AM"){
       saudacao = ", bom dia."
     }
     else if(datahora[2]==="PM" && datahora[1]< 6){
        saudacao = ", boa tarde."
     }
     else{
        saudacao =", boa noite."
     }
    let nome = token.nome.split(" ")
    bemvindo.innerText = `Olá, ${ nome[0].substr(0)} ${saudacao}`
}

getfistName()

