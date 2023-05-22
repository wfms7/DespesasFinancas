

class tableUser{
    constructor(){
       
       

    }

     createTable(users){
       
        let table =""
       
        users.usuarios.forEach(element => {

            table += `
            <tr class="tableitens__body-iten-all">
            <td class="tableitens__body-iten" data-heading="Nome">${element.nome}</td>
            <td class="tableitens__body-iten" data-heading="Mãe">${element.nomeMae}</td>
            <td class="tableitens__body-iten" data-heading="Email">${element.email}</td>
            <td class="tableitens__body-iten" data-heading="Login">${element.login}</td>
            <td class="tableitens__body-iten-botao">
                <div class="tableitens__body-container-botao">
                    <a href="../page/editusuario.html?id=${element.id}" class="button-principal">
                        <div class="button-img edit-icon" aria-label="Botão editar"></div>
                        
                        <span class="button-text"> Editar </span>
                    </a>
                    <button href="" class="button-principal" data-btndelete="${element.id}">
                        <div class="button-img trash-icon" aria-label="Botão deletar"></div>
                        
                        <span class="button-text"> Deletar </span>
                    </button>
                </div>
          
            </td>
          </tr>
            
            `
            
            
        });

        return table
     }

}

export {tableUser}