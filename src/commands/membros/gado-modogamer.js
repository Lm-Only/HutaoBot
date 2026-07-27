import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Gado',
    description: 'Mede o nível de gado de uma pessoa.',
    commands: ['gado', 'gada'],

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

            const chifre = [
                "ultra extreme gado😱",
                "Gado-Master😼",
                "Gado-Rei🤴🐂",
                "Gado...",
                "Escravo-ceta😏🔥...",
                "Escravo-ceta Maximo🙀",
                "Gacorno?😾",
                "Jogador De Forno Livre<3🔥",
                "Mestre Do Frifai<3😻",
                "Gado-Manso😇",
                "Gado-Conformado😘",
                "Gado-Incubado😵",
                "Gado Deus🔱",
                "Mestre dos Gados😎",
                "Topa tudo por buceta🤓",
                "Gado Comum...",
                "Mini Gadinho🙈",
                "Gado Iniciante😹",
                "Gado Basico😽",
                "Gado Intermediario😼",
                "Gado Avançado😻",
                "Gado Profisional😼",
                "Gado Mestre😈",
                "Gado Chifrudo👹",
                "Corno Conformado👺",
                "Corno HiperChifrudo💀",
                "Chifrudo Deus☠️",
                "Mestre dos Chifrudos👽"
            ];

            const gado =
                chifre[Math.floor(Math.random() * chifre.length)];

            const porcentagem =
                Math.floor(Math.random() * 111);

            await react('⏳');

            const PESSOA = mention || sender;

            reply(
                `❰ *Analisando sua ficha de gado 🐂* ⧽ ` +
                `@${PESSOA.split('@')[0]} Aguarde... ❱`
            );

            setTimeout(() => {

                hutao.sendImage(
                    from,
                    IMAGENS.imgado,
                    `*O quanto você é gado?* 🐂\n\n` +
                    `「 @${PESSOA.split('@')[0]} 」\n\n` +
                    `Você é: ❰ ${porcentagem}% ❱ GADO 🐂\n\n` +
                    `${gado}\n\n` +
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