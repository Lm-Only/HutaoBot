import { hutao } from "../system.js";
import { delay } from 'baileys';

import aluguel from '../../../assets/groups/aluguel.json' with { type: 'json' };
import { faltaConfigurar } from './alugar-bot.js';
import { enviarTabela } from './renovar-bot.js';

const getStatusAluguel = (data) => {
    const now = Math.floor(Date.now() / 1000);
    const seconds = Number(data.time || 0) - now;

    const vencido = Boolean(data.ended) || seconds <= 0;

    if (vencido) {
        return {
            status: 'Vencido ❌',
            vencimento: 'Expirado'
        };
    }

    const dias = Math.floor(seconds / (3600 * 24));
    const horas = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutos = Math.floor((seconds % 3600) / 60);

    return {
        status: 'Ativo ✅',
        vencimento: `${dias}d ${horas}h ${minutos}m`
    };
};

hutao.setCommand({
    name: 'Grupos alugados',
    description: 'Lista e gerencia os grupos alugados pelo cliente',

    commands: [
        'grupos',
        'meusgrupos',
        'meu-aluguel'
    ],

    execute: async ({
        reply,
        sender,
        prefixo
    }) => {
        if (await faltaConfigurar(reply, sender)) {
            return 0;
        }

        const meusGrupos = aluguel.filter(data => data?.cliente === sender);

        if (!meusGrupos.length) {
            await reply(
                '❌️ - Você ainda não possui nenhum grupo alugado no seu número.\n\n' +
                '• Veja abaixo os planos disponíveis para começar seu aluguel. 🙇‍♀️'
            );
            await delay(450);
            return enviarTabela(reply, sender, prefixo);
        }

        let texto =
            '🏠 *SEUS GRUPOS ALUGADOS* 🏠\n\n' +
            `• Total de grupos: *${meusGrupos.length}*\n` +
            '• Acompanhe o status de cada aluguel abaixo:\n\n';

        for (let i = 0; i < meusGrupos.length; i++) {
            const grupo = meusGrupos[i];
            const info = getStatusAluguel(grupo);

            texto +=
                `『 ${i + 1} 』➮ *${grupo.name || 'Grupo sem nome'}*\n` +
                `   • ID: *${grupo.id || 'N/A'}*\n` +
                `   • Status: *${info.status}*\n` +
                `   • Alugado em: *${grupo.data || 'N/A'}*\n` +
                `   • Vencimento: *${info.vencimento}*\n\n`;
        }

        texto +=
            '📌 *Gerenciamento rápido:*\n' +
            `• *${prefixo}renovarbot* -> renovar aluguel vencido\n` +
            `• *${prefixo}plano* -> ver planos disponíveis\n` +
            `• *${prefixo}alugar* -> ver tabela completa`;

        return reply(texto);
    }
});
