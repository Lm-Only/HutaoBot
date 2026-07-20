import { hutao } from "../system.js";

import { arrayRandom } from "../../utils/generics.js";

import txt from '../../messages/messages.js';
import IMAGENS from './../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Rank Pau KKK',
    descrition: 'Rank aleatorio de quem fez o maior desmatamento',

    commands: ['rankpau'],
    execute: async ({
        isGroup,
        isModoGamer,
        groupMembers,
        groupName,
        reply,
        from,
        quoted
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const IMAGEM_PAU = IMAGENS.rnkpau; // 😏
        let TEXT_PAU = `*Rank dos menor e maior pau do grupo...🪵*\n${groupName}\n\n`;
        const tipos = [
            "QUEIMADO, TÃO GRANDE QUE BATEU NO SOL E QUEIMOU ksksks",
            'Fimose ainda', 'De grande só o ovo mesmo kkkk',
            'Tá servindo de torre pra pegar sinal',
            "Médio", "Grandinho", "Pequeno", "Enorme", "BATENDO NA LUA ksksk",
            "Servindo de poste kkk", "Pequenininho", "Vara de pegar manga🥭",
            "Procurador de petróleo kk😂", "Grande", "Gigante",
            "Batendo nas estrelas✨", "Anda com um três oitão na cueca😱 sksks",
            "Batendo em Marte kk", "Minúsculo", "Normal", "Sofrendo com essa fimose kk"
        ];

        for (let i = 0; i < 5; i++) {
            const membro = arrayRandom(groupMembers).split("@")[0];
            const tipo = arrayRandom(tipos);

            TEXT_PAU += `➣ ${i + 1} @${membro}\n${tipo} _-_\n\n`;
        }


        hutao.sendImage(from, IMAGEM_PAU, TEXT_PAU, quoted);
    }
});