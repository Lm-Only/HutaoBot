import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Nazista',
    description: 'Mede o nível de nazista de uma pessoa.',
    commands: ['nazista'],

    execute: async ({
        reply,
        react,
        mention,
        quoted,
        from,
        sender,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        try {

            const porcentagem =
                Math.floor(Math.random() * 111);

            await react('⏳');

            const PESSOA = mention || sender;

            reply(
                `❰ *Pesquisando sua ficha de nazista* ⧽ ` +
                `@${PESSOA.split('@')[0]} Aguarde... ❱`
            );

            setTimeout(() => {

                hutao.sendImage(
                    from,
                    IMAGENS.imgnazista,
                    `*SUA FICHA DE NAZISTA....*\n\n` +
                    `➬ 「 @${PESSOA.split('@')[0]} 」\n\n` +
                    `VOCÊ É ✰${porcentagem}%✰ NAZISTA 😳👺\n\n` +
                    setting.NomeDoBot,
                    quoted
                );

            }, 200);

        } catch (error) {

            console.error(error);
            reply(txt.erros.command_error_executor);

        }
    }
});