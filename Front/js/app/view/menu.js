import {  tokenfunc } from "../../Token.js";

const headerMenu = document.querySelector('[data-headerMenu]');
const headerNav = document.querySelector('[data-headerNav]');

const pag =  document.querySelector('[data-pag]').dataset.pag; 

let inicial =""

function getInicial(){

  const token = tokenfunc.getToken()
 
  let nome = token.nome.split(" ");

  inicial = nome[0].substr(0,1)+nome[nome.length -1].substr(0,1)


}

getInicial()



 function criarMenu(){
   let urlPage ='.'
   let srcLogo = 'img'
   if(pag !== 'index')
   {
   
      urlPage ='..'
      srcLogo ='../img' 
   }

     
   

    headerMenu.innerHTML = `
         <div class="header__container">
        <button class="header__menu" id="menu-nav" ><img class="header__menu-imagem" src="${srcLogo}/menu.svg" alt="menu"> </button>
        <img class="header__imagem-logo" src="${srcLogo}/Logo.png" alt="Logo Finança Pessoal">
        <div class="header__user">
           <p class="header__user-acronym" id="inicial">${inicial}</p>       
        </div>
        
    
    `
    headerNav.innerHTML=`
    <div class="nav-menu__container" data-navmenu>
    <ul class="nav-menu__lista">
        <li class="nav-menu__item "><a href="${urlPage}/page/dashboard.html" class="nav-menu__link" data-url data-url>Dashboard</a></li>
        <li class="nav-menu__item"><a href="${urlPage}/page/perfil.html" class="nav-menu__link" data-url>Perfil</a></li>
        <li class="nav-menu__item"><a href="${urlPage}/page/despesas.html" class="nav-menu__link" data-url>Despesas</a></li>
        <li class="nav-menu__item"><a href="${urlPage}/page/cartaocredito.html" class="nav-menu__link"data-url>Cartão de Credito</a></li>
        <li class="nav-menu__item"><a href="${urlPage}/page/renda.html" class="nav-menu__link" data-url>Renda</a></li>
        <li class="nav-menu__item"><a href="${urlPage}/page/usuario.html" class="nav-menu__link" data-url> Usuario</a></li>
    </ul>
    <button class="nav-menu__item btn-Sair" id="btnSair">Sair</button>
    `
   
 }

 criarMenu();

 const navAtiva = document.querySelectorAll('[data-url]');
 

 function marcarAtiva(){

   navAtiva.forEach(nav  =>{
     if(pag!= 'index')
     {
      if( nav.href.includes(pag) ){
        nav.classList.add('nav-menu__link--ativo');
        nav.parentElement.classList.add('nav-menu__item--ativo');

      }
     }
     else{
      navAtiva[0].classList.add('nav-menu__link--ativo');
      navAtiva[0].parentElement.classList.add('nav-menu__item--ativo');
     }
     
   } )
 }

 marcarAtiva();
