class DateHelpers{
    constructor(){

    }

    dateToText(data){
              
       
        let day = new Date(data).toLocaleString("pt-br",{day:"2-digit",timeZone:"UTC"})
        let month = new Date(data).toLocaleString("pt-br",{month:"2-digit",timeZone:"UTC"})
        let year = new Date(data).toLocaleString("pt-br",{year:"numeric",timeZone:"UTC"})
       
        
    
        return  `${year}-${month}-${day}`
    }

    convertToSearchDate(date){

        let month = new Date(date).toLocaleString("pt-br",{month:"2-digit",timeZone:"UTC"})
        let year = new Date(date).toLocaleString("pt-br",{year:"numeric",timeZone:"UTC"})

        return `${year}/${month}`
    }

    convertDateToBRonlyMonthYear(date){

        let month = new Date(date).toLocaleString("pt-br",{month:"2-digit",timeZone:"UTC"})
        let year = new Date(date).toLocaleString("pt-br",{year:"numeric",timeZone:"UTC"})

        return `${month}/${year}`
    }

   
}

export {DateHelpers}