import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Fiel',
    description: 'Descobrir o nível de fidelidade',
    commands: ['fiel'],

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

        const FRASES_FIEL = [
            'Mais fiel que Chico Moeda',
            'Mais fiel que cachorro esperando na porta',
            'Mais fiel que carteiro na chuva',
            'Mais fiel que WiFi de vizinho',
            'Mais fiel que boleto no dia 5',
            'Mais fiel que mãe rezando por você',
            'Mais fiel que sombra no sol quente',
            'Mais fiel que imposto no fim do mês',
            'Mais fiel que pastor cobrando dízimo',
            'Mais fiel que saudade de ex'
        ];

        try {
            await react('⏳');

            reply(`❰ *Analisando o seu nível de ${command}* ❱ @${MEMBRO.split('@')[0]} Aguarde...`);

            const PORCENTAGEM = Math.floor(Math.random() * 101);
            const FRASE = FRASES_FIEL[Math.floor(Math.random() * FRASES_FIEL.length)];

            const TEXTO = `*O quanto você é ${command}?*\n\n` +
                `➬ 「 @${MEMBRO.split('@')[0]} 」\n\n` +
                `*VOCÊ É: ✰ ${PORCENTAGEM}% ✰ ${command.toUpperCase()}*\n\n` +
                `_${FRASE}_\n\n` +
                `${setting.NomeDoBot}`;

            await hutao.sendImage(
                from,
                IMAGENS.fiel,
                TEXTO,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});
