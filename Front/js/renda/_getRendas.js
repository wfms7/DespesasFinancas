import { conectaAPIrenda } from "../app/conectaAPI/conectaAPIrenda.js";
import { tokenfunc } from "../Token.js";
import btnDelete from "./_deletarRenda.js";


const sectionPricipalRenda = document.querySelector('[data-pricipal]')


function criarTable(id,nome , tipo,valor,mensal,mes){

   

    const reusltMelsal = mensal === true ? "Sim" : "Não"
   
    let mesConvertido = new Date(mes)

  
    const pariodo = new Date(mes).toLocaleString("pt-br",{month:"long", year:"numeric" ,timeZone: 'UTC'}) 

  

    sectionPricipalRenda.innerHTML+=`
    <tr class="tableitens__body-iten-all">
    <td class="tableitens__body-iten" data-heading="Renda" >${nome}</td>
    <td class="tableitens__body-iten" data-heading="Tipo" >${tipo}</td>
    <td class="tableitens__body-iten" data-heading="Mensal" >${reusltMelsal}</td>
    <td class="tableitens__body-iten" data-heading="Periodo" > ${pariodo}</td>
    <td class="tableitens__body-iten" data-heading="Valor" >R$ ${valor.toFixed(2)}</td>
    <td class="tableitens__body-iten-botao">
        <div class="tableitens__body-container-botao">
            <a href="../page/editrenda.html?id=${id}" class="button-principal">
                <div class="button-img edit-icon" aria-label="Botão editar"></div>
                
                <span class="button-text"> Editar </span>
            </a>
            <button href="" class="button-principal" data-btndelete="${id}">
                <div class="button-img trash-icon" aria-label="Botão deletar"></div>
                
                <span class="button-text"> Deletar </span>
            </button>
        </div>

    </td>
</tr>

    `
}





async function getIncome(skip){

    sectionPricipalRenda.innerHTML=``;

    const token = tokenfunc.getToken();
    const resultApiRendas = await conectaAPIrenda.getAllRendas(skip,token.id);

    
    resultApiRendas.rendas.forEach(element => {
        criarTable(element.id,element.nome , element.tipo,element.valor,element.mensal,element.mes);
        
    });

    const totalLinhas = document.getElementById('total-linhas');
    totalLinhas.innerHTML = resultApiRendas.count;

    btnDelete()
  
}

async function getRendaData(data, skip){
    sectionPricipalRenda.innerHTML=``;

    
    const token = tokenfunc.getToken()
    const resultApiRendas = await conectaAPIrenda.getRendaPorData(skip,data,token.id)
    
    
    resultApiRendas.rendas.forEach(element=>{
        criarTable(element.id,element.nome , element.tipo,element.valor,element.mensal,element.mes);
    });

    const totalLinhas = document.getElementById('total-linhas');
    totalLinhas.innerHTML = resultApiRendas.count;
    btnDelete()

}

function retornarPag1(){
    const numeroPagina = document.getElementById('numero-pagina')
    numeroPagina.innerHTML = 1
}



export const getRendasall = {
    getIncome,
    getRendaData,
    retornarPag1,
}