
import { conectaAPIloga } from "../../conectaAPI/conectaAPILogar.js";

const form = document.getElementById('form');
const msg =  document.getElementById('loginMensagem');
async function logar(evento){
    evento.preventDefault();
    msg.innerHTML =""
   
    const login = document.getElementById('login').value;
    const senha = document.getElementById('password').value;



  

    if(login=="" ,senha =="")
    {
        msg.innerHTML = "Login ou Senha invalida "
        return
    }

    const result = await conectaAPIloga.logar(login, senha) 
   
    if(result.id== undefined){
        msg.innerHTML = "Login ou Senha invalida "
        return
    }

    localStorage.setItem("tokenfinanceiro", JSON.stringify(result))

    window.location.href="../../../../page/dashboard.html"

}

form.addEventListener('submit', evento => logar(evento))

