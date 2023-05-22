const navMenu = document.querySelector('[data-navmenu]')

export default function abrirNavBAr(){
    navMenu.classList.toggle('nav-menu__container-ativo');
}