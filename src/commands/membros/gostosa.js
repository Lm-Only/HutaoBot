import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Gostosa',
    description: 'Descobrir o nível de gostosura',
    commands: ['gostosa'],

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

            reply(`❰ *Analisando o seu nível de gostosa🥵* ⧽ @${MEMBRO.split('@')[0]} Aguarde... ❱`);

            await hutao.sendImage(
                from,
                IMAGENS.imgostosa,
                `*O quanto você é gostosa?🤭*\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É › ${Math.floor(Math.random() * 111)}% ‹ GOSTOSA*🙀\n\n` +
                `${setting.NomeDoBot}`,
                quoted
            );
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});