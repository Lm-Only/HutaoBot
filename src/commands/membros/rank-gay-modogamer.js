/**
 * Comando oficial do modo gamer
 * Este é usado para que você tenha uma base do que vai precisar.
 * Atenção, leia tudo com atenção e tente entender o máximo
 *
 * ⚠️ Criar comandos que já tem o mesmo nome da Hutao, não vai substituir, o da Hutao vai ser executado primeiro ⚠️
 */

/** Util para setar comando e enviar midias */
import { hutao } from "../system.js";


/** Mensagens do bot */
import txt from '../../messages/messages.js';


/** Settings como NomeDoBot e etc */
import { setting, arrayRandom } from "../../utils/generics.js";


/** Obter imagens */
import IMAGENS_URL from '../../../assets/media/images/imglinks.json' with { type: 'json' };



hutao.setCommand({
    name: 'Rank Gay',
    description: 'Obter os mais gays do Grupo rs',
    commands: ['rankgay'],

    execute: async ({
        from, // Importa o grupo que enviou
        info, // Importa - info da mensagem 
        reply, // importa - Enviar mensagens de texto simples
        isGroup, // importa - se tá em grupo
        isModoGamer, // importa - se o modo gamer está ativo
        groupMembers, // importa - membros de grupo
        groupName, // importa - Nome de Grupo kkcahcahkk
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoGamer) return reply(txt.gamer_mode);

        const IMAGEM_GAY = IMAGENS_URL.rnkgay;

        try {
            let TEXTO_GAY = `*RANK DOS MAIS GAYS DO GRUPO🏳️‍🌈*\n↳ ${groupName}\n\n`;

            /** Loop que se repete 6 vezes **/
            for (let i = 0; i < 6; i++) {
                /** Pega alguém aleatorio */
                const MEMBRO_RANDOM = arrayRandom(groupMembers);
                
                /** Lista essa pessoa */
                TEXTO_GAY += `↝ ${i + 1}° @${MEMBRO_RANDOM.split('@')[0]}\n`;
            }

            /** Texto final **/
            TEXTO_GAY += `\n⏤͟͟͞͞${setting.NomeDoBot}`;

            /** Envia imagem + legenda texto **/
            hutao.sendImage(from, IMAGEM_GAY, TEXTO_GAY, info);
        } catch (error) {
            console.error(error); // Printa no console
            reply(`*HOUVE UM PROBLEMA...🤧*`); // Mensagem de aviso no Whatsapp
        }
    }
});