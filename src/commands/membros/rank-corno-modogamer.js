import { hutao } from "../system.js";
import { setting, arrayRandom } from "../../utils/generics.js";

import txt from '../../messages/messages.js';

import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rank Corno',
    description: 'Pegar uma lista aleatrorio dos cornos do grupo',

    commands: ['rankcorno', 'rankcornos'],
    execute: async ({
        isGroup,
        isModoGamer,
        groupMembers,
        from,
        quoted,
        groupName,
        reply
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const IMAGEM_CORNO = IMAGENS.rnkcorno;
        let TEXTO_CORNO = `*OS MAIS CORNOS DESSE GRUPO SÃO ESSES*\n 𝐺𝑟𝑢𝑝𝑜⧽ ${groupName}\n\n`;

        try {
            for (let i = 0; i < 6; i++) {
                const ALEATORIO = arrayRandom(groupMembers);
                TEXTO_CORNO +=
                    `${i + 1} ➣ ${Math.floor(Math.random() * 100)}% @${ALEATORIO.split('@')[0]}\n\n`;
            }

            TEXTO_CORNO += setting.NomeDoBot;

            hutao.sendImage(from, IMAGEM_CORNO, TEXTO_CORNO, quoted);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});