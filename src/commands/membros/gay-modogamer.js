import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Gay',
    description: 'Descobrir o nível de gay',
    commands: ['gay'],

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

            reply(`❰ *Pesquisando a sua ficha de gay 🏳️‍🌈* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            const PORCENTAGEM = Math.floor(Math.random() * 110);

            let RESULTADO = 'Humm... você é hétero. 😔';

            if (PORCENTAGEM >= 21 && PORCENTAGEM <= 30)
                RESULTADO = '+/- boiola.';
            else if (PORCENTAGEM >= 31 && PORCENTAGEM <= 40)
                RESULTADO = 'Tenho minhas desconfianças... 😑';
            else if (PORCENTAGEM >= 41 && PORCENTAGEM <= 49)
                RESULTADO = 'Você é né? 😏';
            else if (PORCENTAGEM === 50)
                RESULTADO = 'Você é ou não??? 🤨';
            else if (PORCENTAGEM >= 51)
                RESULTADO = 'É UM BAITOLÃO ACIMA DA MÉDIA! 🙀';

            await hutao.sendImage(
                from,
                IMAGENS.imggay,
                '*O quanto você é gay?* 🏳️‍🌈\n\n' +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `Você é *${PORCENTAGEM}%* gay.\n\n` +
                `${RESULTADO}\n\n` +
                setting.NomeDoBot,
                quoted
            );
            
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});