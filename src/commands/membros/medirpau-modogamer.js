import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Medir Pau',
    description: 'Mede o tamanho do pau.',
    commands: ['medirpau', 'pau', 'rola', 'piroca'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        sender,
        mention,
        command,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const MEMBRO = mention || sender;

        try {

            await react('😳');

            reply(
                `*Medindo o tamanho do seu ${command}* 😳\n\n` +
                `⇒ @${MEMBRO.split('@')[0]}\n\n` +
                '*Calma ae kkk...*'
            );

            const TAMANHO = Math.floor(Math.random() * 100) + 1;

            await hutao.sendImage(
                from,
                IMAGENS.imgmedirpau,
                '*Eita kkkk*\n\n' +
                `⇒ @${MEMBRO.split('@')[0]}\n\n` +
                `Seu ${command} mede ✮${TAMANHO}cm✮ 😳\n\n` +
                setting.NomeDoBot,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});