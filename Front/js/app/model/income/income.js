class income{
    constructor(id, incomeName, incomeType,monthlyIncome ,valueIncome, startPeriod,endPeriod,idUser){
        this._id =id;
        this._incomeName = incomeName;
        this._incomeType = incomeType;
        this._monthlyIncome =monthlyIncome;
        this._valueIncome = parseFloat(valueIncome);
        this._startPeriod = new Date(startPeriod);
        this._endPeriod =new Date( endPeriod);
        this._idUser = idUser
    }

    get id(){
        return this._id;
    }

    get incomeName(){
        return this._incomeName;
    }

    get incomeType(){
        return this._incomeType;
    }

    get monthlyIncome(){
        return this._monthlyIncome;
    }

    get startPeriod(){
        return new Date(this._startPeriod)
    }

    get endPeriod(){

        return new Date(this._endPeriod)
    }

    get valueIncome(){
        return this._valueIncome
    }

    get idUser(){
        return this._idUser
    }



}

export {income}