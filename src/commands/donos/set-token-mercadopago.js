import { hutao } from "../system.js";

import txt from '../../messages/messages.js';
import { WRT_FL } from "../../utils/generics.js";
import { cancelarPagamentosAutomaticos } from '../../utils/pix-manager.js';
import { temChavePixConfigurada } from '../../utils/pix.js';

import global from '../../../assets/settings/global.json' with { type: 'json' };

const TOKEN_REGEX = /^APP_USR-[A-Za-z0-9-]{30,}$/;

hutao.setCommand({
    name: 'Set Token Mercado Pago',
    description: 'Define o ACCESS TOKEN do Mercado Pago para o auto aluguel',

    commands: [
        'settokenmp',
        'settokenpix',
        'tokenmp',
        'tokenpix'
    ],

    execute: async ({
        isDono,
        q,
        prefixo,
        reply
    }) => {
        if (!isDono) return reply(txt.Owner);

        const token = String(q || '').trim();

        if (!token) {
            return reply(
                '❌ - Informe o token do Mercado Pago ao lado do comando.\n\n' +
                `• Exemplo: *${prefixo}settokenmp APP_USR-94242792-2462874...*\n\n` +
                '• Resumo de comandos:\n' +
                `> *${prefixo}settokenmp <token>* - define token\n` +
                `> *${prefixo}settokenmp 0* - desativa somente a confirmação automática\n` +
                `> *${prefixo}autoaluguel* - ativa/desativa auto aluguel`
            );
        }

        if (['0', 'padrao', 'padrão', 'default', '_seu_token_aqui_'].includes(token.toLowerCase())) {
            global.ACESS_TOKEN_PIX = '_SEU_TOKEN_AQUI_';
            WRT_FL('./assets/settings/global.json', global, 2);

            const cancelados = await cancelarPagamentosAutomaticos();

            return reply(
                '✅ - Confirmação automática do Mercado Pago desativada.\n\n' +
                `• ${cancelados} cobrança(s) automática(s) pendente(s) foram canceladas.\n` +
                `• ${temChavePixConfigurada()
                    ? 'A chave PIX continua disponível; o dono deverá confirmar cada pagamento.'
                    : `Defina uma chave com *${prefixo}chavepix <chave>* para usar o fluxo manual.`}`
            );
        }

        if (!TOKEN_REGEX.test(token)) {
            return reply(
                '❌ - O token informado parece inválido.\n\n' +
                '• Formato esperado: *APP_USR-...*\n' +
                '• Verifique se não há espaços extras no início/fim.'
            );
        }

        global.ACESS_TOKEN_PIX = token;
        WRT_FL('./assets/settings/global.json', global, 2);

        return reply(
            '✅ - Token do Mercado Pago salvo com sucesso!\n\n' +
            '• O pagamento automático via PIX já pode ser usado quando o auto aluguel estiver ativo.\n\n' +
            '• Resumo de comandos:\n' +
            `> *${prefixo}settokenmp <token>* - atualiza token\n` +
            `> *${prefixo}settokenmp 0* - desativa Mercado Pago\n` +
            `> *${prefixo}autoaluguel* - ativa/desativa auto aluguel\n` +
            `> *${prefixo}plano 1* - gera PIX para o cliente`
        );
    }
});
