const footer = document.querySelector('[data-footer]');

function criarFooter(){
    footer.innerHTML ='';

    footer.innerHTML = `
    <div class="footer__container">
           
    <h2 class="footer__titulo">Finanças Pessoais </h2>
    
    </div>
    `;
}

criarFooter();