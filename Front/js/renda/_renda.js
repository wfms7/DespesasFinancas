import {  getRendasall } from "./_getRendas.js";
const btnConsulta = document.getElementById('btnBuscarPorInput')
getRendasall.getRendas(0);

btnConsulta.addEventListener('click',()=>{
    const valorData = document.getElementById('buscaInput')
   
    let mes = new Date (valorData.value).toLocaleString("pt-br",{   month:"2-digit" ,timeZone: 'UTC'})
    let ano = new Date (valorData.value).toLocaleString("pt-br",{   year:"numeric" ,timeZone: 'UTC'})
    let dataConvert = ano +"/" +mes

   // dataConvert =  dataConvert.getFullYear() +"/"+ ("0"+ (dataConvert.getMonth() +1)).slice(-2)

    
   
    getRendasall.getRendaData(dataConvert,0)
    getRendasall.retornarPag1()
})