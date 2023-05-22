



function openCard(btnOpen, iconUpDn){

    
    btnOpen.classList.toggle('listaGrid__continer-dados-ativo');
    iconUpDn.classList.toggle('chevrons-down-icon')
    iconUpDn.classList.toggle('chevrons-up-icon')
}



export default function opencard()
{
const btnCardDespesas = document.querySelectorAll('[data-btn-listagrid]') ;

btnCardDespesas.forEach( btn => {
    
    btn.addEventListener('click', () =>{

        let divprincipal = btn.parentNode;
       // divprincipal = divprincipal.parentNode;
        let btnOpen = divprincipal.querySelector('[data-listagrid-container]')
        let iconUpDn = divprincipal.querySelector('[data-icon-UpDn]')

        openCard(btnOpen,iconUpDn)

    } )
})
}
