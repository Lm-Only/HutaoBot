import { hutao } from "../system.js";
import txt from '../../messages/messages.js';

import { setting, arrayRandom } from "../../utils/generics.js";
import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rank Gostoso',
    description: 'Obter os mais gostosos do grupo',
    commands: ['rankgostoso'],

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

        const IMAGEM = IMAGENS.rnkgostoso;

        try {
            await react('😍');

            let TEXTO = `*🙀 PARADOS AI 🧐🤚*\n\n`;

            for (let i = 0; i < 6; i++) {
                const MEMBRO = arrayRandom(groupMembers);
                TEXTO += `➣ ${i + 1}° ⸺͟͞ꪶ@${MEMBRO.split('@')[0]}\n\n`;
            }

            TEXTO += `*Multas por serem gostosos demais 🙀 paguem pena trabalhando em nossa agência de modelos 😼*\n\n${setting.NomeDoBot}`;

            hutao.sendImage(from, IMAGEM, TEXTO, quoted);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});