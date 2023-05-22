class tableIncome {
  constructor() {}

  createTable(income) {
    let table = "";

    income.rendas.forEach((element) => {
      table += `
            <tr class="tableitens__body-iten-all">
            <td class="tableitens__body-iten" data-heading="Renda" >${
              element.nome
            }</td>
            <td class="tableitens__body-iten" data-heading="Tipo" >${
              element.tipo
            }</td>
            <td class="tableitens__body-iten" data-heading="Mensal" >${
              element.mensal
            }</td>
            <td class="tableitens__body-iten" data-heading="Periodo" > ${
              new Date( element.mes ).toLocaleString("pt-br",{month:"short" , year:"numeric" , timeZone: "UTC"}) 
            }</td>
            <td class="tableitens__body-iten" data-heading="Valor" >R$ ${element.valor.toFixed(
              2
            )}</td>
            <td class="tableitens__body-iten-botao">
                <div class="tableitens__body-container-botao">
                    <a href="../page/editrenda.html?id=${
                      element.id
                    }" class="button-principal">
                        <div class="button-img edit-icon" aria-label="Botão editar"></div>
                        
                        <span class="button-text"> Editar </span>
                    </a>
                    <button href="" class="button-principal" data-btndelete="${
                      element.id
                    }">
                        <div class="button-img trash-icon" aria-label="Botão deletar"></div>
                        
                        <span class="button-text"> Deletar </span>
                    </button>
                </div>
        
            </td>
        </tr>
                      
            `;
    });

    return table;
  }
}

export { tableIncome };
