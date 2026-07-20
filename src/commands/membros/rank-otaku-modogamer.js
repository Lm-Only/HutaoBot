import { hutao } from "../system.js";
import { setting, arrayRandom } from "../../utils/generics.js";
import txt from '../../messages/messages.js';
import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rank Otaku',
    description: 'Obter os maiores otakus do grupo',
    commands: ['rankotaku', 'rankotakus'],

    execute: async ({
        from,
        quoted,
        reply,
        isGroup,
        isModoGamer,
        groupMembers,
        groupName
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const IMAGEM_OTAKU = IMAGENS.rnkotaku;

        try {
            let TEXTO = `*🎌✨RANK OTAKUS DO GRUPO: ⛩️⚔️*\n↳ ${groupName}\n\n`;

            for (let i = 0; i < 6; i++) {
                const MEMBRO = arrayRandom(groupMembers);
                TEXTO += `↝ ${i + 1}° @${MEMBRO.split('@')[0]}\n`;
            }

            TEXTO += `\n⏤͟͟͞͞${setting.NomeDoBot}`;

            hutao.sendImage(from, IMAGEM_OTAKU, TEXTO, quoted);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});