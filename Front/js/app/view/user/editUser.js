import { DateHelpers } from "../../helpers/DateHelpers.js";
import {User} from "../../model/user/user.js"

class editUser {
    constructor(){
        this._inputName = document.getElementById('nomeuser');
        this._inputMotherSname = document.getElementById('nomemaeuser');
        this._inputDateOfBirth = document.getElementById('dataNascimentouser');
        this._inputEmail = document.getElementById('emailuser');
        this._inputLogin = document.getElementById('loginuser');
        this.convertData = new DateHelpers()
    }

    insertDataIntoInput(userData){

        let convertedDateOfBirth = this.convertData.dateToText( userData.dataNascimento)   
      
        this._inputName.value =userData.nome;
        this._inputMotherSname.value = userData.nomeMae;
        this._inputDateOfBirth.value = convertedDateOfBirth;
        this._inputEmail.value = userData.email;
        this._inputLogin.value = userData.login;
        

    }

    getFormData(userID){
         const userDate = new User(userID,
            this._inputName.value,
            this._inputMotherSname.value,
            this._inputDateOfBirth.value,
            this._inputEmail.value,
            this._inputLogin.value,
            null
         )
         

         return userDate

    }
}

export {editUser}