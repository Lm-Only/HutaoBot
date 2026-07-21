import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Tapa',
    description: 'Dá um tapa em alguém.',
    commands: ['tapa'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        mention,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        if (!mention) {
            return reply(
                '• Mencione o "@" ou responda a mensagem de alguém. 🤷‍♀️\n' +
                `• Exemplo: ${setting.prefixo}tapa @xuser`
            );
        }

        try {

            await react('👋');

            await hutao.sendVideo(
                from,
                IMAGENS.imgtapa,
                `*VOCÊ DEU UM TAPA GOSTOSO NA RABA DA 🤭*\n\n` +
                `➣ 『 @${mention.split('@')[0]} 』 😏🔥\n\n` +
                setting.NomeDoBot,
                quoted
            );

        } catch (error) {

            console.error(error);
            reply(txt.erros.command_error_executor);

        }
    }
});