/**
 * Criado Oficialmente pro Lm Only
 * Uso de IA não esta incluso
 * 
 * LEIA O FINAL
 */

import { delay } from 'baileys';
import { hutao } from "../system.js";
import { readFile } from 'node:fs/promises';

import { ALUGUEL_CONFIG } from '../settings.js';
import txt from '../../messages/messages.js';
import { checkAluguel } from '../../messages/index.js';
import { temChavePixConfigurada, temTokenMercadoPago } from '../../utils/pix.js';

import global from '../../../assets/settings/global.json' with { type: 'json' };
import aluguel from '../../../assets/groups/aluguel.json' with { type: 'json' };

import { setting } from "../../utils/generics.js";

let TEXTO_TABELA = null; // não mexa - isso vai ser o cache

/**
 * Isso aqui é pra pegar o texto da tabela
 * Se der erro, ele retorna algo nulo
 * Se der OK, retorna o texto da tabela
 * 
 * OBS: Na primeira vez que ele carregar o texto
 * O bot vai guardar temporariamente
 * Isso evita que tudo seja carregado do zero
 * Economizando CPU (Mesmo que o consumo seja pouco kkkkk)
 * E e sacrificando a memoria ram (host baratas de 256mb de ram, scrr)
 * 
 * @returns {Promise<string|null>}
 */
export async function pegarTabelaDoBot() {
    if (typeof TEXTO_TABELA === 'string') {
        return TEXTO_TABELA;
    }

    try {
        return await readFile('./src/menus/tabela-planos-bot.txt', 'utf-8');
    } catch (error) {
        console.log('[ ERROR ] - Erro ao ler o arquivo de tabela.\n\n' +
            '-> Se você mexeu em algo errado ou apagou o arquivo\n' +
            '-> Recupere, ou o bot apenas vai enviar o seu número.\n'
        );
        console.error(error);
        return null;
    }
}

/**
 * Verifica se a pessoa já alugou ou não
 * Se a pessoa já tem registro, ele guarda
 * Se além disso o alugou já venceu
 * Retorna as info
 * 
 * @param {String} sender Numero do whatssap
 * @returns {Object} info se a pessoa já alugou
 */
export function verificarPessoa(sender) {
    let index = 0;
    const statusCliente = {
        aluguelFinalizado: false,
        existente: false
    };

    for (const data of aluguel) {
        if (!data.cliente) {
            continue;
        }

        if (data.cliente === sender) {
            statusCliente.existente = true;
            statusCliente.name = data.name;
            statusCliente.id = data.id;
            statusCliente.alugadoEm = data.data;
            statusCliente.index = index;

            if (data.ended) {
                statusCliente.aluguelFinalizado = true;
            }

            break; // finaliza a verifição
        }

        index++;
    }

    return statusCliente;
}

export async function faltaConfigurar(reply, sender) {
    const mensagem = txt.alugarMessage
        .replace(/#user#/, sender.split('@')[0])
        .replace(/#numero#/, setting.NumeroDoDono);

    const pixNaoConfigurado =
        !temTokenMercadoPago() &&
        !temChavePixConfigurada();

    if (!global.AUTO_ALUGUEL || pixNaoConfigurado) {
        await reply(mensagem);
        return true;
    }

    try {
        TEXTO_TABELA = await pegarTabelaDoBot();

        const semTabela =
            !TEXTO_TABELA ||
            TEXTO_TABELA.startsWith('null');

        if (semTabela) {
            await reply(mensagem);
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);

        reply(mensagem);
        return false;
    }
}


hutao.setCommand({
    name: 'Alugar',
    description: 'Mostra tabela ou manda entrar em contato',

    commands: [
        'alugar',
        'aluga',
        'precos', // sem acentos
        'planos'
    ],
    execute: async ({
        reply,
        sender,
        isDono,
        isDonos,
        prefixo
    }) => {
        try {
            // if (isDono || isDonos) {
            //     return reply('🤷‍♀️ - Você é o *dono*, não pode alugar o proprio bot... 🧐');
            // }

            if (await faltaConfigurar(reply, sender)) {
                return 0;
            }

            const statusUser = verificarPessoa(sender);

            if (global.AUTO_ALUGUEL && statusUser.existente) {
                const index = statusUser.index;
                const data = aluguel[index];
                const now = Math.floor(Date.now() / 1000);
                const seconds = data.time - now;

                if (statusUser.aluguelFinalizado) {
                    await reply(
                        '⚠️ - `ATENÇÃO` ⚠️\n\n' +
                        '• Seu plano do aluguel foi *vencido.* 🥺\n' +
                        '• Isso significa que é necessário *renovar* o bot 💖\n\n' +
                        `• Para renovar, use o comando *${prefixo}RenovarBot* 🙇‍♀️\n\n` +
                        '-> Irei enviar o *Status* abaixo: 👇'
                    );
                } else {
                    await reply(
                        '✅️ - Você *já* tem um plano de aluguel ativo, tudo está em dias. 🙇‍♀️\n' +
                        '🏠 - Veja o *status* abaixo: 👇'
                    );
                }

                await delay(500);
                reply(checkAluguel(data, seconds));

                if (!ALUGUEL_CONFIG.multiGrupos) return 0;
            }

            reply(TEXTO_TABELA
                .replace(/#prefixo#/g, prefixo)
            ); // leia mais lá no final -
        } catch (error) {
            console.error(error);
            
            // se der erro, ele manda seu contato ksksksks
            return reply(txt.alugarMessage
                .replace(/#user#/, sender.split('@')[0])
                .replace(/#numero#/, setting.NumeroDoDono)
            );
        }
    }
});



/**
 * ⚠️ LEIA
 * 
 * se você até aqui
 * deve ser por causa do reply 
 * 
 * Resumo, você pode editar tudo. Mas tenha cuidado com o que você está fazendo.
 * 
 * Ou seja, você pode trocar o reply para que o bot envie uma imagem ou video.
 * Pode permitir que ele envie um audio ou figurinha
 * 
 * Enfim, faça seu melhor para que seus clientes se sintam satisfeitos em contratar seu bot hutao
 * 
 * Eu mesmo tive o trabalho de criar o sistema, envolvendo complexiade e muita estrategia.
 * Você apenas deve ajeitar seu texto e sua informações (como CHAVE_PIX ou TOKEN)
 */