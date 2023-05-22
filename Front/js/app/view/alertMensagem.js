const alert = document.querySelector('[data-alert]')

 function alertMensagem(titulo,mensagem,tipo)
{
    
    alert.innerHTML = `
    <div class="alert_container show" >
    <div class="alert__container-right-${tipo}"></div>
    <div class="alert-container-center-${tipo}">
        <h2 class="alert__titulo">${titulo}</h2>
        <p class=" alert__mensagem">${mensagem}</p>
        <p class="alert__footer"></p>
    </div>
    <div class="alert__container-left-${tipo}"><img src="../img/x-circle-w.svg" alt="botao para fechar" class="alert__btn_x" id="closeAlert"></div>
    </div>
    `

    getBtnClose()

   

}

 function alertMensagemClose(){
    const alert = document.querySelector('[data-alert]')
    alert.innerHTML = ``
}



function getBtnClose(){

    const btnCloseAlert = document.getElementById('closeAlert');

    btnCloseAlert.addEventListener('click' , () => alertMensagemClose())
}


 function closeAlert(){

    alert.innerHTML =``

}


export const alertMensagens ={
    alertMensagem,
    alertMensagemClose,
    closeAlert
}
