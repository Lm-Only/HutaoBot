import { hutao } from "../system.js";
import txt from '../../messages/messages.js';

import { arrayRandom } from "../../utils/generics.js";
import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rank Casal',
    description: 'Obter casais aleatórios do grupo',
    commands: ['rankcasal'],

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

        const IMAGEM = IMAGENS.imgrankcasal;

        try {
            await react('💞');

            let TEXTO = `*👀 RANK DOS CASAIS DO GRUPO 💅😍*\n\n`;

            for (let i = 0; i < 3; i++) {
                const MEMBRO1 = arrayRandom(groupMembers);
                const MEMBRO2 = arrayRandom(groupMembers);
                const AFINIDADE = Math.floor(Math.random() * 100);

                TEXTO += `➮ ${i + 1}° ⸺͟͞ꪶ🌙⧽ @${MEMBRO1.split('@')[0]}\n💞\n ⸺͟͞ꪶ☀️⧽ @${MEMBRO2.split('@')[0]}\n\n*Com uma porcentagem de⧽ ✰ ${AFINIDADE}% ✰*🙅‍♀️\n\n`;
            }

            hutao.sendImage(from, IMAGEM, TEXTO, quoted);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});