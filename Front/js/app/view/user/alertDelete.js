import { userControllerDeleta } from "../../controller/user/userControllerDeleta.js";

class alertDelete {
  constructor() {
    this.tagDelete = document.querySelector("[data-deletetag]");
    this._controlerDelete = new userControllerDeleta();
  }

  alertDelete(user) {
    this.tagDelete.innerHTML = `
    <div class="delete__container ">
      <div class="delete__conteiner-box show">
          <h2 class="deletar__titulo">Deletar</h2>
          <p class="deletar__texto">Tem certeza que quer deletar USUARIO:</p>
          <label for="" class="deleta__iformacao delete-negrito" id="nomeUser-delete">${user.nome}</label>
          <label for="" class="deleta__iformacao" id="nomemaeUser-delete">Mãe: ${user.nomeMae}</label>
          <label for="" class="deleta__iformacao"id="emailUser-delete"> Email: ${user.email}</label>
          <label for="" class="deleta__iformacao"id="loginUser-delete">Login: ${user.login}</label>
          <div class="delete__container-botao">                
               <button class="button-principal delete__button" id="btn-delete-sim" data-iddelete="${user.id}">Sim</button>
               <button class="button-principal delete__button" id="btn-delete-nao">Não</button>
          </div>
       </div>
      </div>
`;
    this.btncloseAlertDelete();
    this.btnDeletarUser();
  }

  btncloseAlertDelete() {
    const cancelDelete = document.getElementById("btn-delete-nao");

    cancelDelete.addEventListener("click", () => {
      this.tagDelete.innerHTML = ``;
    });
  }

  btnDeletarUser() {
    const btnDeletar = document.querySelector("[data-iddelete]");
    
    btnDeletar.addEventListener("click", () => {
      this._controlerDelete.deleteUser(btnDeletar.dataset.iddelete);
      this.tagDelete.innerHTML = ``;
    });
  }

  
   
  
}

export { alertDelete };
