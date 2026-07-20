import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Lésbica',
    description: 'Descobrir o nível de lésbica',
    commands: ['lesbica'],

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
            await react('😳');

            reply(`❰ *Analisando seu nível de lésbica 😱* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            const PORCENTAGEM = Math.floor(Math.random() * 101);

            let TEXTO_INFO;

            if (PORCENTAGEM <= 9)
                TEXTO_INFO = "Humm você não é lésbica... 😔";
            else if (PORCENTAGEM <= 19)
                TEXTO_INFO = "Tenho minhas desconfianças. 🧐";
            else if (PORCENTAGEM <= 29)
                TEXTO_INFO = "Você parece ser lésbica, porém tenho minhas desconfianças. 😑";
            else if (PORCENTAGEM <= 50)
                TEXTO_INFO = "Lésbica mal assumida! 😾";
            else if (PORCENTAGEM <= 61)
                TEXTO_INFO = "Você é ou não?? 🤨";
            else if (PORCENTAGEM <= 80)
                TEXTO_INFO = "Você é né?? 😏";
            else
                TEXTO_INFO = "*LÉSBICA TOTALMENTE ASSUMIDA!! 😹*";

            await hutao.sendImage(
                from,
                IMAGENS.imglesbica,
                `*Seu nível de lésbica??* 🤔\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${PORCENTAGEM}% ✰ LÉSBICA 💋*\n\n` +
                `• ${TEXTO_INFO}\n\n`
                `${setting.NomeDoBot}`,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});