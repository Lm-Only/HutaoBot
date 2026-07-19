import { hutao } from "../system.js";
import { delay } from "baileys";
import { setting } from "../../utils/generics.js";
import txt from '../../messages/messages.js';

import IMAGENS_URL from '../../../assets/media/images/imglinks.json' with { type: 'json' };


hutao.setCommand({
    name: 'Comando safado de comer rs',
    commands: ['comer', 'transar'],

    execute: async ({
        isGroup,
        from,
        reply,
        isModoGamer,
        mention,
        react,
        quoted,
        command

    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);
        if (!mention) return reply('• Mencione o "@" ou a mensagem de alguém. 🤷‍♀️\n' + "• `Exemplo: " + 
            setting.prefixo + command + " @xuser`");

        react("⏳");
        await delay(500);

        const IMAGE_COMER = IMAGENS_URL.imgcomer;
        const TEXT_COMER = `Você acaba de comer gostosinho a(o) ⧽ @${mention.split("@")[0]}... 🥵🔞`

        try {
            hutao.sendVideo(from, IMAGE_COMER, TEXT_COMER, quoted);
        } catch (error) {
            console.error(e);
            reply(`*HOUVE UM PROBLEMA...🤧*`);
        }
    }
});