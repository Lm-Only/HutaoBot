import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from './../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rico',
    description: 'Descobrir o nível de rico',
    commands: ['rico'],

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
            await react('💰');

            reply(`❰ *Analisando o seu nível de rico* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            const TEXTO = `*O quanto você é rico?*\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${Math.floor(Math.random() * 101)}% ✰ RICO*\n\n` +
                `${setting.NomeDoBot}`;

            await hutao.sendImage(
                from,
                IMAGENS.rico,
                TEXTO,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});
