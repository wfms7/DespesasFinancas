import { conectaAPIusuario } from "../../conectaAPI/conectaAPIusuario.js"

export default async function validateLogin(login ,campo){
  
  let result = await conectaAPIusuario.validateLogin(login);

  if(parseInt(result)>0){


    campo.setCustomValidity('Login ja existe')


  }
 
}