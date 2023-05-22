


const tiposDeErro = [
    'valueMissing',
     'customError'
]

const mensagemErro ={
    nome:{
        valueMissing:"Campo nome obrigatorio",
    },
    tipo:{
        valueMissing:"Campo tipo obrigatorio",
    },
    periodoinicio:{
        valueMissing:"Campo Periodo Inicio obrigatorio",
    },
    periodofim:{
        valueMissing:"Campo Periodo Fim obrigatorio",
        customError:"Periodo fim não pode ser menor que a Periodo Inicio "
    },
    valor:{
        valueMissing:"Campo Valor obrigatorio",
    }

}


export default function validarcampoRenda(campo){
   let mensagem = "";
   
   tiposDeErro.forEach( erro => {

   
    if(campo.id ==="renda-periodo-fim"){
        validarDataFIM(campo)
    }

    console.log(campo.validity)

    if(campo.validity[erro]){
        let camp = (campo.name).replace("renda-","")
      
        mensagem = mensagemErro[camp][erro]
    }

   
   })


    let labelErro = campo.parentNode.querySelector('.mensagem__texto');
    
   if(labelErro == null){
    
    labelErro = campo.parentNode.parentNode.querySelector('.mensagem__texto');

    if(labelErro== null){
        labelErro = campo.parentNode.parentNode.parentNode.querySelector('.mensagem__texto');

    }

   
   }

    
    const validadorDeImput = campo.checkValidity();

   
    if(!validadorDeImput){
       
        labelErro.textContent =mensagem;
    
    }
    else{
        labelErro.textContent= "";
    }
    
}


function validarDataFIM(campo){

    const dataInicio = document.getElementById("renda-periodo-inicio").value
    const dataFim = document.getElementById("renda-periodo-fim").value
    console.log(dataInicio> dataFim , dataInicio ,dataFim )
    if(dataInicio> dataFim){
        campo.setCustomValidity("Periodo Fim menor que Periodo Inicio")
    }
    else{
        console.log(campo.setCustomValidity("")) 
    }

   

}