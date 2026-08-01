import { hutao } from "../system.js";

import txt from '../../messages/messages.js';
import { SWP } from '../../utils/jid-utils.js';
import { autorizarLinkManual } from '../../utils/pix-manager.js';

const obterJidCliente = (mention, query) => {
    if (mention?.includes('@')) return mention;

    const numero = String(query || '').replace(/\D/g, '');
    if (numero.length < 10 || numero.length > 15) return null;

    return `${numero}${SWP}`;
};

hutao.setCommand({
    name: 'Autorizar link de aluguel',
    description: 'Confirma manualmente um PIX e libera o cliente para enviar o link do grupo',

    commands: [
        'autorizarlink',
        'autorizar-link',
        'autorizar_link',
        'liberar',
        'liberarlink',
        'liberar-link',
        'confirmarpix',
        'confirmar-pagamento'
    ],

    execute: async ({
        isDono,
        isDonos,
        mention,
        q,
        prefixo,
        reply
    }) => {
        if (!isDono && !isDonos) return reply(txt.Owner);

        const cliente = obterJidCliente(mention, q);
        if (!cliente) {
            return reply(
                '❌ - Informe ou mencione o cliente que teve o pagamento conferido.\n\n' +
                `• Exemplo: *${prefixo + command}* 5511999999999*\n` +
                `• Ou: *${prefixo + command} @cliente*`
            );
        }

        const resultado = await autorizarLinkManual(cliente);
        if (!resultado.ok) {
            return reply(`❌ - ${resultado.mensagem}`);
        }

        const { pendente, tipo, registro } = resultado;
        if (tipo === 'renovacao') {
            return reply(
                '✅ - Pagamento manual confirmado e renovação concluída!\n\n' +
                `• Cliente: *${cliente.split('@')[0]}*\n` +
                `• Grupo: *${registro?.name || registro?.id}*\n` +
                `• Plano: *${pendente.plano.nome}*\n` +
                `• Valor: *R$ ${Number(pendente.plano.valor || 0).toFixed(2)}*`
            );
        }

        return reply(
            '✅ - Pagamento manual confirmado!\n\n' +
            `• Cliente: *${cliente.split('@')[0]}*\n` +
            `• Plano: *${pendente.plano.nome}*\n` +
            `• Valor: *R$ ${Number(pendente.plano.valor || 0).toFixed(2)}*\n\n` +
            '📲 O cliente foi liberado no PV e já pode enviar o link do grupo.\n' +
            '🤖 Assim que receber o link, o bot entrará no grupo e ativará o aluguel.'
        );
    }
});
