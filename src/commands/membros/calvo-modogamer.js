
import { hutao } from "../system.js";
import { delay } from "baileys";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Calvo',
    description: 'Mede o nível de calvície de alguém.',
    commands: ['calvo', 'calva'],

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

            await react('👩🏻‍🦲');
            reply(`❰ *Pesquisando a sua porcentagem de calvo(a)* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);
            await delay(200);

            const PORCENTAGEM = Math.floor(Math.random() * 101);

            await hutao.sendImage(
                from,
                IMAGENS.imgcalvo,
                `*👩🏻‍🦲 O QUANTO VOCÊ É ${command.toUpperCase()} 👩🏻‍🦲*` +
                `\n\n-> @${MEMBRO.split('@')[0]}\n\n` +
                `Você é > ${PORCENTAGEM}% < ${command} 🧑🏻‍🦲\n\n` +
                `⸺͟͞ꪶ${setting.NomeDoBot}`,
                quoted
            );

        } catch (error) {

            console.error(error);
            reply(txt.erros.command_error_executor);

        }
    }
});

