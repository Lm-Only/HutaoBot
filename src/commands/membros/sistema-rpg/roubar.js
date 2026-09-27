import { hutao } from "../../system.js";
import { WRT_FL } from "../../../utils/generics.js";

import txt from '../../../messages/messages.js';

import gold from '../../../../assets/groups/gold.json' with { type: 'json' };




// use isso apenas para salvar as alterações do modorpg
export const saveDb = () => WRT_FL('./assets/groups/gold.json', gold);




hutao.setCommand({
    name: 'Roubar',
    description: 'Roubar alguém do grupo',

    commands: ['roubar'],
    execute: async ({ 
        isGroup,
        isModoRpg,
        mention,
        botNumber,
        prefixo,
        command,
        reply,
        from,
        sender
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isModoRpg) return reply(txt.modorpg);
        if (!mention) return reply(
            '• Mencione o "@" ou a mensagem de alguém. 🤷‍♀️\n• `Exemplo: ' 
            + prefixo + command + ' @xuser`'
        );

        if (botNumber.includes(mention)) return reply('*Ué você não pode me assaltar!!😠😠*');

        const groupUang = gold[from];
        const PESSOA = groupUang?.[mention];

        if (!PESSOA) return reply(
            '*Essa pessoa não se encontra registrada no sistema de golds... 🤷‍♀️*\n' + 
            '> *Marque alguém que tenha interagido no grupo recetemente*'
        );

        if (sender.includes(mention)) return reply('*Não é possível assaltar você mesmo...😑*');

        const ME = groupUang[sender];
        const senderTag = sender.split('@')[0];
        const targetTag = mention.split('@')[0];

        if (ME.RBS >= 5) return reply(`@${senderTag} *Você ja roubou o povo demais, volte amanhã para roubar mais... 😈*`);
        if (PESSOA.URB.includes(senderTag)) return reply(
            `*@${senderTag} Você ja tentou roubar essa pessoa!!🚫*`
        );
        if (PESSOA.uang < 10) return reply(
            'Essa pessoa não tem nem onde cair morto, pobre desgramado... Vá roubar alguém mais rico 🤡'
        );
        if (ME.uang === 0) return reply('Você não pode roubar ninguém, pois você tá mais liso que sabão.🤡');

        // se tem escudo -
        if (PESSOA.ESC) {
            if ((Math.random() * 4 | 0) === 2) {
                PESSOA.ESC = false;
                saveDb();
                return await reply(' Essa pessoa estava de escudo e você *Conseguiu Quebrar* 😼✨🛡 ');
            }

            PESSOA.URB.push(senderTag);
            saveDb();
            return await reply(' Que pena, essa pessoa estava de escudo, porém você não conseguiu quebrar!!🛡☹️ ');
        }

        ME.RBS++;
        PESSOA.URB.push(senderTag);

        const ganho = Math.random() * PESSOA.uang | 0;
        const randy = Math.random() * 6 | 0;

        const outcomes = {
            1: () => {
                ME.uang += ganho;
                PESSOA.uang -= ganho;
                saveDb();
                return reply(`✰ Assalto efetuado com sucesso...✨ @${senderTag}, você roubou ${ganho} R$ 💰💎 da conta de @${targetTag} 🙇‍♀️ ✰`);
            },
            2: () => {
                saveDb();
                return reply(`❀ Que pena @${senderTag} sua tentativa de roubo foi um fracasso contra @${targetTag}...😢 ❀`);
            },
            3: () => {
                ME.uang -= ganho;
                PESSOA.uang += ganho;
                saveDb();
                return reply(`✦҈͜͡➳ Sua tentativa de assalto não teve sucesso...😾 E agora ${ganho} R$ pertencem a @${targetTag} 💰💎 ✰`);
            },
            4: () => {
                if (ME.uang >= ganho) {
                    ME.uang -= ganho;
                    PESSOA.uang += ganho;
                    saveDb();
                    return reply(`✰ ${ganho} Foram subtraídos de você na tentativa de assalto contra @${targetTag} 💰💎. Não desanime!! ✰`);
                }
                saveDb();
                return reply(`✯ Sinto muito, você tentou roubar o usuario @${targetTag} e não conseguiu nada, Voltou de mãos vazias...😪 ✯`);
            }
        };

        return (outcomes[randy] || (() => {
            saveDb();
            return reply(`✯ Sinto muito, você tentou roubar o usuario @${targetTag} e não conseguiu nada, Voltou de mãos vazias...😪 ✯`);
        }))();
    }
});
