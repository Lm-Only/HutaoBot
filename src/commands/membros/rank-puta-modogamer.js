import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'RankPuta',
    description: 'Ranking das mais putas do grupo',
    commands: ['rankputa'],

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
            await react('😈');

            let RANK = `*ESSAS SÃO AS MAIS PUTAS DO GRUPO*\n\n`;

            const POSICOES = ['🥇', '🥈', '🥉', '😈', '😈'];

            for (let i = 0; i < 5; i++) {
                const MEMBRO = groupMembers[Math.floor(Math.random() * groupMembers.length)];
                RANK += `${POSICOES[i]} ⧽ *${i + 1}º* — @${MEMBRO.split('@')[0]}\n`;
            }

            await hutao.sendImage(
                from,
                IMAGENS.rankputa,
                RANK,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});
