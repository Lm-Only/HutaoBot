import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Gostoso',
    description: 'Mede o nível de gostosura de uma pessoa.',
    commands: ['gostoso'],

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

            const porcentagem = Math.floor(Math.random() * 111);

            await react('⏳');
            const PESSOA = mention || sender;

            reply(
                `❰ *Analisando sua ficha de gostoso* ⧽ ` +
                `@${PESSOA.split('@')[0]} Aguarde... ❱`
            );

            setTimeout(() => {

                hutao.sendImage(
                    from,
                    IMAGENS.imgostoso,
                    `*Se liga o quanto vc é Gostoso* 🤤\n\n` +
                    `➬ 「 @${PESSOA.split('@')[0]} 」\n\n` +
                    `VOCÊ É ›${porcentagem}%‹ GOSTOSO🤤\n\n` +
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