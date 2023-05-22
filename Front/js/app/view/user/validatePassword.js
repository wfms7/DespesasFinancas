
export default function validarSenha(campo,senha , repetirSenha)
{
    if (senha != repetirSenha){
     
        campo.setCustomValidity('campo Senha e Repetir Senha são diferentes')
    }
    else{
        campo.setCustomValidity("")
    }

}