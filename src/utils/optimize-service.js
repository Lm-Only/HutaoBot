/**
 * HutaoBot pro versão 10.0.0
 * By: Lm Only
 * 
 * SELO: ❌️
 * 
 * ⚠️ Este codigo é aberto, mas atenção!! ⚠️
 * 
 * - Não confie em fazer alterações neste script
 * - Pois é de certeza que estes dados podem ser substituidos automaticamente.
 * - Os arquivos com permissão para editar devem ter o SELO: ✅️
 * 
 * - Não que isso seja proibido, pois sei que tem ums enzo que confunde 
 * - E tenta alterar só pra parecer o fodastico da web
 * 
 * - É mais questão de segurança e preocupação.
 */
const main = (objeto, groupMembers) => {
    let tamanho = 0; //Tamanho do consumo
    const array = []; //Membros que saíram

    for (let element of Object.keys(objeto)) {

        //verifica se a pessoa não tá no grupo
        if (!groupMembers.includes(element) && element !== "name") {
            tamanho += JSON.stringify(objeto).toString().length;
            array.push(element);
        }
    }

    return { tamanho, array };
};

export default main;
