import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Linda',
    description: 'Descobrir o nível de beleza',
    commands: ['linda'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        sender,
        mention,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const MEMBRO = mention || sender;

        try {

            await react('⏳');

            reply(`❰ *Analisando seu nível de beleza* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            await hutao.sendImage(
                from,
                IMAGENS.imglinda,
                `*O quanto você é Linda?*\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${Math.floor(Math.random()*100)}% ✰ LINDA 😻*\n\n` +
                `${setting.NomeDoBot}`,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});