import { hutao } from "../system.js";

import txt from "../../messages/messages.js";
import { setting, arrayRandom } from "../../utils/generics.js";

import IMAGENS from "../../../assets/media/images/imglinks.json" with { type: "json" };

hutao.setCommand({
    name: 'Rank Buceta',
    description: 'Ranking das mais bucetudas.',
    commands: ['rankbct'],

    execute: async ({
        from,
        quoted,
        reply,
        react,
        groupName,
        groupMembers,
        isGroup,
        isModoGamer
    }) => {

        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        try {

            await react('🏁');

            let TEXTO =
                '*🍑✨ RANK DAS MAIS BUCETUDAS DO GRUPO ✨🍑*\n' +
                `↳ ${groupName}\n\n`;

            for (let i = 0; i < 5; i++) {

                const MEMBRO = arrayRandom(groupMembers);

                TEXTO +=
                    `↝ ${i + 1}° @${MEMBRO.split('@')[0]}\n`;
            }

            TEXTO += `\n${setting.NomeDoBot}`;

            await hutao.sendImage(
                from,
                IMAGENS.imgrankbct,
                TEXTO,
                quoted
            );

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
        }
    }
});