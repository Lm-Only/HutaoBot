import { hutao } from "../system.js";
import { setting, onlyNumber, WRT_FL } from "../../utils/generics.js";

import txt from '../../messages/messages.js';
import { verificarPessoa, pegarTabelaDoBot, faltaConfigurar } from './alugar-bot.js'; // Pega dos comanos personalizados

import aluguel from '../../../assets/groups/aluguel.json' with { type: 'json' };
import global from '../../../assets/settings/global.json' with { type: 'json' };
import cliente from '../../../assets/users/cliente-aluguel.json' with { type: 'json' };

import { delay } from "baileys";

const estaVencido = (registro, agora = Math.floor(Date.now() / 1000)) =>
    Boolean(registro?.ended) || Number(registro?.time || 0) <= agora;

const limparSelecao = (sender) => {
    if (!Object.hasOwn(cliente, sender)) return;

    delete cliente[sender];
    WRT_FL('./assets/users/cliente-aluguel.json', cliente, 2);
};

const selecionarGrupo = (sender, grupo) => {
    cliente[sender] = grupo.id;
    WRT_FL('./assets/users/cliente-aluguel.json', cliente, 2);
};

export async function enviarTabela(reply, sender, prefixo) {
    try {
        const TEXTO_TABELA = await pegarTabelaDoBot();

        if (!TEXTO_TABELA || TEXTO_TABELA === 'null') {
            return reply(txt.alugarMessage
                .replace(/#user#/, sender.split('@')[0])
                .replace(/#numero#/, setting.NumeroDoDono)
            );
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

hutao.setCommand({
    name: 'Renovar bot',
    description: 'Renovar aluguel do bot, ou enviar a tabela',

    commands: [
        'renovarbot',
        'renovar-bot',
        'renovar_bot',
        'renovar'
    ],
    execute: async ({
        sender,
        prefixo,
        command,
        q: query,
        reply
    }) => {
        const statusUser = verificarPessoa(sender);

        if (!statusUser.existente) {
            if (await faltaConfigurar(reply, sender)) {
                return 0;
            }

            await reply('❌️ - *Vi* que você ainda não alugou o bot, caso tenha *interesse* em alugar, veja a mensagem abaixo: 👇');
            await delay(500);
            return enviarTabela(reply, sender, prefixo);
        }

        const GRUPOS_ALUGADOS = aluguel.filter(data =>
            data?.cliente === sender && estaVencido(data)
        );

        if (!GRUPOS_ALUGADOS.length) {
            limparSelecao(sender);
            return reply('🙇‍♀️ - EIi! *Relaxa*, ✨️ Tudo está *OK!* Você ainda não tem nenhum aluguel vencido. 💖');
        }

        if (await faltaConfigurar(reply, sender)) {
            return 0;
        }

        if (GRUPOS_ALUGADOS.length === 1) {
            selecionarGrupo(sender, GRUPOS_ALUGADOS[0]);
            await reply(`🔮 - O grupo *${GRUPOS_ALUGADOS[0].name || GRUPOS_ALUGADOS[0].id}* está vencido.\n` +
                '*Escolha* uma das opções desejadas. 🙇‍♀️\n' +
                '> Exemplo: *' + prefixo + 'plano 3*'
            );
            return await enviarTabela(reply, sender, prefixo);
        }

        if (query) {
            const MESSAGE_ERROR = '❌️ - *Forma Errada*, ao lado do comando coloque apenas o número da posição que ele se encontra na *lista*. 🤷‍♀️\n\n-\n' +
                '> Para ver a lista, envie o comando sem nada do lado! 💖'
            if (isNaN(query)) {
                return reply(MESSAGE_ERROR)
            }

            const posicao = Number(query);
            if (!Number.isInteger(posicao) || posicao < 1 || posicao > GRUPOS_ALUGADOS.length) {
                return reply(MESSAGE_ERROR);
            }

            selecionarGrupo(sender, GRUPOS_ALUGADOS[posicao - 1]);

            await reply('🔮 - *Escolha* uma das opções desejadas. 🙇‍♀️\n' +
                '> Exemplo: *' + prefixo + 'plano 3*'
            );
            await delay(550);
            return enviarTabela(reply, sender, prefixo);
        }

        let TEXTO_DE_GRUPOS = '💎 - *ESCOLHA UM GRUPO* 💎\n\n' +
            '• Escolha um grupo para renovar. 🙇‍♀️\n\n' +
            '• Use *' + prefixo + command + ' <número>*\n' +
            '> -> Exemplo: *' + prefixo + command + ' 1*\n\n';

        for (let i = 0; i < GRUPOS_ALUGADOS.length; i++) {
            const data = GRUPOS_ALUGADOS[i];

            TEXTO_DE_GRUPOS += ' 『 ' + (i + 1) + ' 』 ➮  ' + data.name + '\n' +
                '    • *Alugado em*: ' + data.data + '\n\n'; 
        }

        reply(TEXTO_DE_GRUPOS);
    }
});