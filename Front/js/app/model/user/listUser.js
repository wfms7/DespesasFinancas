class ListUser{
    constructor(){

        this._listUser = [];
    }

    addListUser(user){
        this._listUser.push(user);
    }
    get listUser(){
        return [].concat(this._listUser);
    }
}

export {ListUser}