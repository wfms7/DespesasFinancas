


    let x = 0
    let w  = 0
    let colunaAgora;
const table = document.getElementById('resizeMe');

const cols = table.querySelectorAll('th')

const getpositionMouse =   function  (e , coluna) {
 
    colunaAgora = coluna;
   x = e.clientX;
   const styles = window.getComputedStyle(colunaAgora);
   w = parseInt(styles.width, 10);
 

 document.addEventListener('mousemove',  moviCols);
 document.addEventListener('mouseup', parapositionColum);

}

const moviCols =  function  (e) {
   
    const dx = e.clientX - x;
    
    colunaAgora.style.width =`${w + dx}px`;
}

const parapositionColum = function (){

 
   document.removeEventListener('mousemove',  moviCols);
  
    document.removeEventListener('mouseup',  parapositionColum);

}


cols.forEach( (coluna) =>{
    coluna.addEventListener('mousedown',(evento)=> getpositionMouse(evento,coluna))
} )


