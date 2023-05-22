
import validatePassword from "./validatePassword.js";
import validateLogin from "./validateLogin.js";




const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]


const mensagens = {
    nomeuser: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },

    nomemaeuser: {
        valueMissing: "O campo de nome da mãe não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },

    dataNascimentouser: {
        valueMissing: "O campo data de nascimento não pode estar vazio.",
       
    },


    emailuser: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    loginuser: {
        valueMissing: "O campo de login não pode estar vazio.",
        patternMismatch: "Por favor, preencha um login válido.",
        customError:"Login ja existe",
        tooShort: "O campo de login não tem caractéres suficientes."
    },
    senhauser: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: "a senha deve contar  numero, caracter especial, letra maiuscula ou minuscula",
        customError: "Campo senha não é igual campo repetir senha",
        tooShort: "O campo de Senha não tem caractéres suficientes."
    },
    repetirSenhauser: {
        valueMissing: 'O campo de repetir senha  não pode estar vazio.',
        patternMismatch: "a senha deve contar  numero, caracter especial, letra maiuscula e minuscula",
        customError: "Campo senha não é igual campo repetir senha",
        tooShort: "O campo de repetir senha não tem caractéres suficientes."
    }
}



 
export default async function verificandoCampo(campo){
    let mensagem = "";
   

    campo.setCustomValidity('');

    if(campo.name === "loginuser"){
       
       
        await  validateLogin(campo.value ,campo)
        
    }

    if(campo.name === "senhauser" || campo.name === "repetirSenhauser" ){

      
        var senha = document.getElementById('senhauser').value;
        var repetirSenha = document.getElementById('repetirSenhauser').value;
        if(senha != '' && repetirSenha != '' ){
      
            validatePassword(campo,senha , repetirSenha)
        }

       
    }

    tiposDeErro.forEach( erro =>{
      
        if(campo.validity[erro]){
           mensagem = mensagens[campo.name][erro];
             
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem__texto');
    const validadorDeImput = campo.checkValidity();

    if(!validadorDeImput){
        mensagemErro.textContent =mensagem;
    
    }
    else{
        mensagemErro.textContent= "";
    }

}
