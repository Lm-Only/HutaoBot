import { hutao } from "../system.js";
import txt from '../../messages/messages.js';

import { setting, arrayRandom } from "../../utils/generics.js";
import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rank Gostosa',
    description: 'Obter as mais gostosas do grupo',
    commands: ['rankgostosa'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        isGroup,
        isModoGamer,
        groupMembers
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const IMAGEM = IMAGENS.rnkgostosa;

        try {
            await react('🤤');

            let TEXTO = `*🌸💋 PARADAS AI 🧐💅*\n\n`;

            for (let i = 0; i < 6; i++) {
                const MEMBRO = arrayRandom(groupMembers);
                TEXTO += `➣ ${i + 1}° ⸺͟͞ꪶ@${MEMBRO.split('@')[0]}\n\n`;
            }

            TEXTO += `*Multas por serem gostosas demais 🙀 paguem pena enviando nuds no PV do dono 😼*\n\n${setting.NomeDoBot}`;

            hutao.sendImage(from, IMAGEM, TEXTO, quoted);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});