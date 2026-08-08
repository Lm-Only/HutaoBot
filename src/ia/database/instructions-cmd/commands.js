/**
 * Comandos para a IA executar
 * 
 * contexto -> faça o melhor resumo para que a IA consiga entender o contexto
 * comando -> apenas o comando, se for um que precisa de parametros, adicione.
 * 
 * cuidado: saiba o que você está fazendo, pois um simples erro pode acabar em problemas
 * @author Lm Only
 */

const COMMANDS_IA = [
    {
        contexto: 'Envie o menu',
        comando: 'menu'
    },
    {
        contexto: 'Abrir grupo às 10:00 am - requer hora formatada HH:mm',
        comando: 'opengp 10:00'
    },
    {
        contexto: 'Fechar grupo às 22:00 pm - requer hora formatada HH:mm',
        comando: 'closegp 22:00'
    },
    {
        contexto: 'gp -> comando usado param abrir e fechar grupo imediatamente. parametros:\nf = fechar o grupo\na = abrir o grupo\n\nmomento = quando o usuario pedir para que o grupo seja aberto ou fechado no exato momento.',
        command: 'Ok, irei usar gp a para abrir o grupo e gp f para fechar o grupo.'
    },
    {
        contexto: 'Tocar música: Play Date',
        command: 'play Play Date'
    },
    {
        contexto: 'Procurar foto de <titulo>',
        command: 'pinterest <titulo>'
    },
    {
        contexto: 'null',
        command: 'null'
    }
];

// por aqui é só - fim...















/**
 * adapta a database da IA
 * 
 * @ignore 
 * @returns array
 */
const SET_DB_IA = () => {
    const array = [];

    for (const data of COMMANDS_IA) {
        if (!data.comando || !data.contexto) continue;

        const ROLE_USER = {
            role: 'user',
            parts: [
                {
                    text: data.contexto
                }
            ]
        };

        const ROLE_MODEL = { 
            role: 'model',
            parts: [
                {
                    text: data.comando
                }
            ]
        };

        array.push(ROLE_USER, ROLE_MODEL);
    }
    
    return array;
};

export const DB_IA = () => SET_DB_IA();
