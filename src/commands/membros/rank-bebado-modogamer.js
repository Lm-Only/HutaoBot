import { hutao } from "../system.js";
import { setting, arrayRandom } from "../../utils/generics.js";
import txt from '../../messages/messages.js';

hutao.setCommand({
    name: 'Rank Bebado',
    description: 'Obter os maiores cachaceiros do grupo',
    commands: ['rankbebado'],

    execute: async ({
        reply,
        isGroup,
        isModoGamer,
        groupMembers,
        groupName
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        try {
            let TEXTO = `*Rank dos mais cachaceiros do grupo 🤪🍺*\n${groupName}\n\n`;

            for (let i = 0; i < 6; i++) {
                const MEMBRO = arrayRandom(groupMembers);
                TEXTO += `🍸➣ ${i + 1}° ⸺͟͞ꪶ@${MEMBRO.split('@')[0]}\n`;
            }

            TEXTO += `\n\n⸺͟͞${setting.NomeDoBot}`;

            reply(TEXTO);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});