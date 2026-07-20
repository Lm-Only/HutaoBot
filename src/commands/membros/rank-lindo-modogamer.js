import { hutao } from "../system.js";
import txt from '../../messages/messages.js';

import { setting, arrayRandom } from "../../utils/generics.js";

hutao.setCommand({
    name: 'Rank Lindo',
    description: 'Obter os mais lindos do grupo',
    commands: ['ranklindo'],

    execute: async ({
        reply,
        react,
        isGroup,
        isModoGamer,
        groupMembers
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        try {
            await react('💋');

            let TEXTO = `*😻 RANK DOS MAIS LINDOS DO GRUPO ✨😍*\n\n`;

            for (let i = 0; i < 6; i++) {
                const MEMBRO = arrayRandom(groupMembers);
                TEXTO += `➣ ${i + 1}° @${MEMBRO.split('@')[0]}\n`;
            }

            TEXTO += `\n${setting.NomeDoBot}`;

            reply(TEXTO);
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});