import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'RankFiel',
    description: 'Ranking dos mais fiéis do grupo',
    commands: ['rankfiel'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        sender,
        command,
        mention,
        groupMembers,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        try {
            await react('💍');

            const FRASES_FIEL = [
                'mais fiel que Chico Moeda',
                'mais fiel que cachorro esperando na porta',
                'mais fiel que carteiro na chuva',
                'mais fiel que WiFi de vizinho',
                'mais fiel que boleto no dia 5',
                'mais fiel que mãe rezando por você',
                'mais fiel que sombra no sol quente',
                'mais fiel que imposto no fim do mês',
                'mais fiel que pastor cobrando dízimo',
                'mais fiel que saudade de ex'
            ];

            let RANK = `*ESSES SÃO OS MAIS FIÉIS DO GRUPO*\n\n`;

            const POSICOES = ['🥇', '🥈', '🥉', '💍', '💍'];

            for (let i = 0; i < 5; i++) {
                const MEMBRO = groupMembers[Math.floor(Math.random() * groupMembers.length)];
                const FRASE = FRASES_FIEL[Math.floor(Math.random() * FRASES_FIEL.length)];
                RANK += `${POSICOES[i]} ⧽ *${i + 1}º* — @${MEMBRO.split('@')[0]} _(${FRASE})_\n`;
            }

            await hutao.sendImage(
                from,
                IMAGENS.fiel,
                RANK,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});
