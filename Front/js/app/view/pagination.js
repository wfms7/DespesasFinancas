

class pagination{
    constructor(){
       this._startPage = 1;
      this.returnResult = [],
      this.rowPerPage = 10,
      this.opacitylow =0.3
      this.opacityUp = 1

    }

    pageBack(number){

        
        
        if(number>this._startPage){
          
            return   --number

        }

        return this._startPage

    }

    skipBack(numberPage){

        return numberPage *this.rowPerPage -this.rowPerPage
    }

    nextPage(numberPage,totalRow){
       

        let totalPage = totalRow/ this.rowPerPage
       
        let newpagina = numberPage +1
     
        
        if(numberPage< totalPage){
            return newpagina
        }

        return numberPage



    }

    skipNext(numberPage){
        return  (numberPage-1)*10
    }

     leftButtonActiveOrNot(numberPage){

        return numberPage>this._startPage ?this.opacityUp : this.opacitylow
    }
    
    rightButtonActiveOrNot(numberPage, totalRow){

        return (numberPage)< (totalRow/this.rowPerPage)? this.opacityUp : this.opacitylow

    }

}

export{pagination}