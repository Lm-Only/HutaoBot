import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

hutao.setCommand({
    name: 'Amor/Ódio',
    description: 'Dedicar amor ou ódio para alguém',
    commands: ['amor', 'odio'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        sender,
        command,
        mention,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        try {
            if (command === 'amor') {

                if (!mention) return reply('Marque a pessoa para quem você quer dedicar o seu amor...');

                await react('🥺');

                const TEXTO = `Olá @${mention.split('@')[0]}, tudo bem? ^^\n` +
                    `@${sender.split('@')[0]} mandou dizer que te ama 🥺💖`;

                reply(TEXTO);

            } else {

                if (!mention) return reply('Marque a pessoa para quem você quer dedicar o seu ódio...');

                await react('🖕');

                const TEXTO = `Olá @${mention.split('@')[0]}, tudo bem? '-'\n` +
                    `@${sender.split('@')[0]} mandou dizer que te odeia com todas as forças 🖕🏽😝`;

                reply(TEXTO);
            }

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});
