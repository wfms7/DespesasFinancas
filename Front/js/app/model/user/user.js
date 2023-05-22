class User{
    constructor(Id, name ,motherSname , dateOfBirth, userEmail,userLogin,password){
       this._id =Id;
        this._name = name;
        this._motherSname = motherSname;
        this._dateOfBirth = dateOfBirth ;
        this._userEmail = userEmail;
        this._userLogin =userLogin;
        this._password = password;
    
    }

    get Id (){
        return this._id
    }

    get name(){
        return this._name
    }
    get motherSname(){
        return this._motherSname
    }

    get dateOfBirth(){
        return this._dateOfBirth
    }

    get userEmail(){
        return this._userEmail
    }

    get userLogin(){
        return this._userLogin
    }

    get password(){
        return this._password
    }

}


export {User}