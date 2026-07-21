import { hutao } from "../system.js";
import { delay } from 'baileys';

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Hétero',
    description: 'Mede o nível de hétero de alguém.',
    commands: ['hetero'],

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

            reply(
                `❰ *Analisando seu nível de hétero 💪* ⧽ ` +
                `@${MEMBRO.split('@')[0]} Aguarde... ❱`
            );

            const PORCENTAGEM = Math.floor(Math.random() * 101);

            let RESULTADO;

            if (PORCENTAGEM <= 9) {
                RESULTADO = 'Humm você é GAY... 😔🏳️‍🌈';
            } else if (PORCENTAGEM <= 19) {
                RESULTADO = 'Um hétero afeminado. 💕';
            } else if (PORCENTAGEM <= 29) {
                RESULTADO = 'Você parece ser hétero, porém tenho minhas desconfianças. 😑';
            } else if (PORCENTAGEM <= 50) {
                RESULTADO = 'Um hétero confuso! 😾';
            } else if (PORCENTAGEM <= 61) {
                RESULTADO = 'Muito hétero. 😳';
            } else if (PORCENTAGEM <= 80) {
                RESULTADO = 'Um hétero quase alfa!! 🥵';
            } else {
                RESULTADO = 'VOCÊ É UM HÉTERO ALFA!! 💪😼';
            }

            await delay(500);

            await hutao.sendImage(
                from,
                IMAGENS.imghetero,
                `*Seu nível de masculinidade??* 😱\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${PORCENTAGEM}% ✰ HÉTERO 🤗*\n\n` +
                `• ${RESULTADO}\n\n` +
                `⸺͟͞ꪶ${setting.NomeDoBot}`,
                quoted
            );

        } catch (error) {

            console.error(error);
            reply(txt.erros.command_error_executor);

        }
    }
});