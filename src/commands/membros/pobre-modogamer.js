import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Pobre',
    description: 'Descobrir o nível de pobre',
    commands: ['pobre'],

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

        const MEMBRO = mention || sender;

        try {
            await react('💸');

            reply(`❰ *Analisando o seu nível de pobre* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            const TEXTO = `*O quanto você é pobre?*\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${Math.floor(Math.random() * 101)}% ✰ POBRE*\n\n` +
                `${setting.NomeDoBot}`;

            await hutao.sendImage(
                from,
                IMAGENS.pobre,
                TEXTO,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});
