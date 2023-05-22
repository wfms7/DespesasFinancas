import urlAPi from "../../config.js"
const conexao = urlAPi();



async function logar(login , senha){
    const apiConexao = await fetch(`${conexao}signin`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
            
        },
        body: JSON.stringify({
            login:login,
            senha:senha

        })
    })

   
    const conexaoConvertida = await apiConexao.json();
   
    return conexaoConvertida
}



export const conectaAPIloga ={
    logar,
}