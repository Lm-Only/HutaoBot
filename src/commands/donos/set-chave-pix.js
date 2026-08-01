import { hutao } from "../system.js";

import txt from '../../messages/messages.js';
import { WRT_FL } from "../../utils/generics.js";

import global from '../../../assets/settings/global.json' with { type: 'json' };

const VALORES_PADRAO = new Set(['0', 'padrao', 'padrão', 'default']);

hutao.setCommand({
    name: 'Set Chave PIX',
    description: 'Define a chave PIX usada no aluguel com confirmação manual',

    commands: [
        'chavepix',
        'setchavepix',
        'set-chave-pix',
        'set_chave_pix'
    ],

    execute: async ({
        isDono,
        isDonos,
        q,
        prefixo,
        reply
    }) => {
        if (!isDono && !isDonos) return reply(txt.Owner);

        const chave = String(q || '').trim();

        if (!chave) {
            return reply(
                '❌ - Informe a chave PIX ao lado do comando.\n\n' +
                `• Exemplo: *${prefixo}chavepix email@exemplo.com*\n\n` +
                '• Aceita CPF, CNPJ, telefone, e-mail ou chave aleatória.\n' +
                `• Use *${prefixo}chavepix 0* para remover a chave manual.`
            );
        }

        if (VALORES_PADRAO.has(chave.toLowerCase())) {
            global.CHAVE_PIX = '_CHAVE_AQUI_';
            WRT_FL('./assets/settings/global.json', global, 2);

            return reply(
                '✅ - Chave PIX manual removida.\n\n' +
                `• Configure outra quando quiser com *${prefixo}chavepix <chave>*.`
            );
        }

        if (chave.length < 3 || chave.length > 200) {
            return reply('❌ - A chave PIX informada parece inválida. Verifique e tente novamente.');
        }

        global.CHAVE_PIX = chave;
        WRT_FL('./assets/settings/global.json', global, 2);

        return reply(
            '✅ - Chave PIX salva com sucesso!\n\n' +
            '• Sem token do Mercado Pago, o bot enviará esta chave ao cliente.\n' +
            '• Depois de conferir o pagamento, libere o próximo passo com:\n' +
            `> *${prefixo}autorizarlink <número-do-cliente>*`
        );
    }
});
