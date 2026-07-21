import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import * as globalText from "../../messages/index.js";

hutao.setCommand({
    name: 'Golpista',
    description: 'Descobrir se alguém é golpista',
    commands: ['golpista'],

    execute: async ({
        reply,
        isGroup,
        isModoGamer,
        mention,
        q
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const MEMBRO = mention || q?.mentionedJid?.[0];

        if (!MEMBRO) {
            return reply(
                '• Mencione o "@" ou responda uma mensagem.\n' +
                '• Exemplo: golpista @usuario'
            );
        }

        try {
            reply(globalText.golpista(MEMBRO));
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});