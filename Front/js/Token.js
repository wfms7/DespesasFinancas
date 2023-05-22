

function getToken(){
    const token = JSON.parse(localStorage.getItem("tokenfinanceiro"))|| []
    return token

}

function RemoverToken(){
    localStorage.removeItem("tokenfinanceiro")

}


export const tokenfunc ={
    getToken,
    RemoverToken

}