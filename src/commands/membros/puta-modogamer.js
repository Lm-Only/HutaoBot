import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Puta',
    description: 'Descobrir o nível de putaria',
    commands: ['puta'],

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

            reply(`❰ *Analisando seu nível de puta 🫢* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            const PORCENTAGEM = Math.floor(Math.random()*101);

            let TEXTO_INFO;

            if (PORCENTAGEM <= 4)
                TEXTO_INFO = 'Você não é puta! 😟';
            else if (PORCENTAGEM <= 9)
                TEXTO_INFO = 'Tenho minhas desconfianças. 😑';
            else if (PORCENTAGEM <= 19)
                TEXTO_INFO = 'Eu tô começando a desconfiar. 🤔';
            else if (PORCENTAGEM <= 29)
                TEXTO_INFO = 'Fica tranquila, vou contar pra ninguém rsrs. 🤭';
            else if (PORCENTAGEM <= 50)
                TEXTO_INFO = 'Puta confusa! 😾';
            else if (PORCENTAGEM <= 61)
                TEXTO_INFO = 'Você é putinha, mas não assumiu ainda. 😳';
            else if (PORCENTAGEM <= 80)
                TEXTO_INFO = 'Puta quase formada! 🥵';
            else
                TEXTO_INFO = 'Uma das maiores putinhas do mundo! 🤤';

            await hutao.sendImage(
                from,
                IMAGENS.imgputa,
                `*O quanto você é puta??* 😈\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${PORCENTAGEM}% ✰ PUTA 🌸*\n\n` +
                `• ${TEXTO_INFO}\n\n` +
                `${setting.NomeDoBot}`,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});