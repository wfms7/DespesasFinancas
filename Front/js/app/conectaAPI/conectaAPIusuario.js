import urlAPi from "../../config.js"
const conexao =  urlAPi();
//const conexaoConvertida = await conexao.json();
const token =  JSON.parse(localStorage.getItem("tokenfinanceiro"))|| []

async function createNewUser(user){
    
   

    const apiConexao = await fetch(`${conexao}usuario`,{
        method:"POST",
        headers: {
            "Content-type":"application/json",
           "Authorization-Token":token.token
       },
        body: JSON.stringify({

          nome: user.name,
          nomeMae:user.motherSname,
          dataNascimento:user.dateOfBirth,
          email:user.userEmail,
          login: user.userLogin,
          senha :user.password

        })

    });

   const conexaoConvertida = await apiConexao.json();

    return conexaoConvertida;

}


async function getAllUser(skip){
    const apiConexao = await fetch(`${conexao}usuario?skip=${skip}`,{
        headers:{
            "Authorization-Token":token.token
        }
    });
    
    const conexaoConvertida = await apiConexao.json();
   
    return conexaoConvertida;
}

async function validateLogin(login){
    const apiConexao = await fetch(`${conexao}usuario?login=${login}`);
    const conexaoConvertida = await apiConexao.json();
    return conexaoConvertida;
}

async function getUserByID(id){
    const apiConexao  = await fetch(`${conexao}usuario/${id}`,{
        headers:{
            "Authorization-Token":token.token
        }
    });
    const conexaoConvertida = await apiConexao.json();
    return conexaoConvertida;
}

async function editUser(userData){
    const apiConexao = await fetch(`${conexao}usuario/${userData.Id}`,{
        method: "PUT",
        headers: {
            "Content-type":"application/json",
            "Authorization-Token":token.token
        },
        body: JSON.stringify({

            nome: userData.name,
            nomeMae:userData.motherSname,
            dataNascimento:userData.dateOfBirth,
            email:userData.userEmail,
            login: userData.userLogin,
            

        })

     })
     const conexaoConvertida = await apiConexao.json();

     return conexaoConvertida;

}

async function deleteUser(id){

    const apiConexao = await fetch(`${conexao}usuario/${id}`,{ 
        
        method: "DELETE",
        headers:{
            "Authorization-Token":token.token
        } })
    const conexaoConvertida = await apiConexao.json();
   
    return conexaoConvertida;
}


async function getByName(skip , name){
    
    const apiConexao = await fetch(`${conexao}usuario?skip=${skip}&name=${name}`,{
        headers:{
            "Authorization-Token":token.token
        }
    });
    const conexaoConvertida = await apiConexao.json();

    return conexaoConvertida;
}


export const conectaAPIusuario = {
    createNewUser,
    getAllUser,
    validateLogin,
    getUserByID,
    editUser,
    deleteUser,
    getByName,
}