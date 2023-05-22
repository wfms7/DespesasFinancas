import urlAPi from "../../config.js";


const token =  JSON.parse(localStorage.getItem("tokenfinanceiro"))|| []

const conexao = urlAPi();

async function saveIncome(saveIncome){
  
    console.log(saveIncome)
   
    const apiConexao = await fetch(`${conexao}renda`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization-Token":token.token
        },
        body: JSON.stringify({
            nome:saveIncome.incomeName,
            tipo:saveIncome.incomeType,
            valor:saveIncome.valueIncome,
            mensal:saveIncome.monthlyIncome,
            mes:saveIncome.startPeriod,
            userId:saveIncome.idUser
        })
    })
    const conexaoConvertida = await apiConexao.json();
    return conexaoConvertida


}

async function getAllIncome(skip,userID){
    const apiConexao =await fetch(`${conexao}renda?skip=${skip}&userID=${userID}`,{
        headers:{
            "Authorization-Token":token.token
        }
    });
    const conexaoConvertida = await apiConexao.json();
    

    return conexaoConvertida

}

async function getByIdIncome(id,userID){
    const apiConexao = await fetch(`${conexao}renda/${id}?userID=${userID}`,{
        headers:{
            "Authorization-Token":token.token
        }
    })

    const conexaoConvertida = apiConexao.json()

    return conexaoConvertida;

}

async function deletarRenda(id){
    const apiConexao = await fetch(`${conexao}renda/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization-Token":token.token
        }
    })

    const conexaoConvertida = await apiConexao.json();

    return conexaoConvertida
}

async function getByDate(skip,data,userID){
    const apiConexao = await fetch(`${conexao}renda?skip=${skip}&data=${data}&userID=${userID}`,{
        headers:{
            "Authorization-Token":token.token
        }
    })

    const conexaoConvertida = await apiConexao.json()

    return conexaoConvertida
}


async function editIncome(incomeDate){
    const apiConexao = await fetch(`${conexao}/renda/${incomeDate.id}`,{
        method:"PUT",
        headers:{
            "Authorization-Token":token.token
        },
        body:JSON.stringify({
            id:incomeDate.id,
            nome:incomeDate.incomeName,
            tipo:incomeDate.incomeType,
            valor:incomeDate.valueIncome,
            mensal:incomeDate.monthlyIncome,
            mes:incomeDate.startPeriod,
            userId:incomeDate.idUser
        })
    })

    const conexaoConvertida = await  apiConexao.json()
    return conexaoConvertida;
}

export const conectaAPIrenda = {
    saveIncome,
    getAllIncome,
    getByIdIncome,
    deletarRenda,
    getByDate,
    editIncome

} 