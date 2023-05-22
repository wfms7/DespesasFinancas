import {  tokenfunc } from "./Token.js";
import abrirNavBAr from "./app/view/nav-menu.js";

const btnNavMenu = document.getElementById('menu-nav');
const today =document.querySelector('[data-today]');
const btnsair = document.getElementById('btnSair');



function checkin(){

    const token =tokenfunc.getToken()


    if(token.length<1)
    {
  
        window.location.href="../index.html"
    }

    let datenow = new Date().getTime()/1000;
   
    
    if(token.tempoex < datenow){

        localStorage.removeItem("tokenfinanceiro")

        window.location.href="../index.html"
  
    }




}

checkin()

function todayNow(){
    
    if (today != null){
        const timeElapsed  = Date.now();
        const todayresult = new Date(timeElapsed);
        today.innerHTML = todayresult.toLocaleDateString() 
    }
    

}
todayNow();



btnNavMenu.addEventListener('click', ()=>{
    abrirNavBAr();
})

btnsair.addEventListener('click',()=>{
     tokenfunc.RemoverToken()

   
    window.location.reload()
})