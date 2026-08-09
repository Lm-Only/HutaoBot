import { hutao } from "../system.js";
import { delay } from "baileys";
import { setting } from "../../utils/generics.js";
import txt from '../../messages/messages.js';
import IMAGENS_URL from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Dar Abraço',
    commands: ['abraco', 'abracar'],
    execute: async ({ isGroup, from, reply, isModoGamer, mention, react, quoted, command }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);
        if (!mention) return reply(`• Mencione o "@" ou a mensagem de alguém. 🤷‍♀️\n• \`Exemplo: ${setting.prefixo}${command} @xuser\``);

        react("⏳");
        await delay(500);

        const targetNum = mention.slice(0, mention.indexOf('@'));

        try {
            await hutao.sendVideo(
                from,
                IMAGENS_URL.imgabraco,
                `Awwnt, você deu um abraço fofinho na(o) ⧽ @${targetNum}... 🥹💖`,
                quoted
            );
        } catch (error) {
            console.error(error);
            reply('*HOUVE UM PROBLEMA...🤧*');
        }
    }
});