import { getUsuario } from "../../usuario/getAllUsuarios.js";
import {getRendasall} from "../../renda/getRendas.js"
const btnleft = document.getElementById("btn-left");
const btnrigth = document.getElementById("btn-right");
const totalLinhas = document.getElementById("total-linhas");
const numeroPagina = document.getElementById("numero-pagina");
const route = document.querySelector("[data-pag]").dataset.pag;

function leftpaginaUser() {
  const linhas = parseInt(totalLinhas.innerHTML);
  const pag = parseInt(numeroPagina.innerHTML);
  const inputBusca = document.getElementById("buscaInput");

  if (pag == 1) {

  } else {
    const atualizarPagina = pag - 1;
    const skip = atualizarPagina * 10 - 10;
  

    switch (route) {
      case "usuario":
        if (inputBusca.value === "") {
          getUsuario.buscarTodosUsuarios(skip);
        } else {
          getUsuario.getUsaurioPornome(skip, inputBusca.value);
        }
        break;
        case "renda":
         
        if(inputBusca.value === ""){
          getRendasall.getRendas(skip);
        }
        else{
          let mes = new Date (inputBusca.value).toLocaleString("pt-br",{   month:"2-digit" ,timeZone: 'UTC'})
          let ano = new Date (inputBusca.value).toLocaleString("pt-br",{   year:"numeric" ,timeZone: 'UTC'})
          let dataConvert = ano +"/" +mes


          getRendasall.getRendaData(dataConvert,skip)
        }
           

        break;
    }

    numeroPagina.innerHTML = "";
    numeroPagina.innerHTML = atualizarPagina;
  }
}


function rightpaginaUser() {
  const linhas = parseInt(totalLinhas.innerHTML);
  const pag = parseInt(numeroPagina.innerHTML);
  const inputBusca = document.getElementById("buscaInput");
  const atepagina = linhas / 10;

  if (pag < atepagina) {
    const skip = pag * 10;
  switch (route) {
    case "usuario":
     
        if (inputBusca.value === "") {
          getUsuario.buscarTodosUsuarios(skip);
        } else {
          getUsuario.getUsaurioPornome(skip, inputBusca.value);
        }

       
      break;
      case "renda":
        if(inputBusca.value === ""){
          getRendasall.getRendas(skip);
        }
        else{

          let mes = new Date (inputBusca.value).toLocaleString("pt-br",{   month:"2-digit" ,timeZone: 'UTC'})
         let ano = new Date (inputBusca.value).toLocaleString("pt-br",{   year:"numeric" ,timeZone: 'UTC'})
        let dataConvert = ano +"/" +mes

          getRendasall.getRendaData(dataConvert,skip)
        }

      break;
  }
  const atualizarPagina = pag + 1;
  numeroPagina.innerHTML = "";
  numeroPagina.innerHTML = atualizarPagina;
}
}

btnleft.addEventListener("click", () => leftpaginaUser());
btnrigth.addEventListener("click", () => rightpaginaUser());
