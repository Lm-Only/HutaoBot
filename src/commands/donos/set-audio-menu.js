import { hutao } from "../system.js";
import { getAudio } from "../../handler.js";
import { getFileBuffer, setting } from "../../utils/generics.js";

import { writeFile } from 'node:fs/promises';

import txt from '../../messages/messages.js';

// Necessario
import global from '../../../assets/settings/global.json' with { type: 'json' };

/** Feito diretamente por - Lm only */
hutao.setCommand({
    name: 'Audio Menu',
    description: 'Definir um audio ou Ativar/Desativar o audio do menu',

    commands: [
        'audiomenu',
        'menuaudio',
        'audio-menu',
        'menu-audio',
        'set-audio-menu'
    ],
    execute: async ({
        info,
        isDono,
        reply,
        command
    }) => {
        if (!isDono) return reply(txt.Owner);

        const audioInfo = getAudio(info);

        if (audioInfo) {
            const audioBuffer = await getFileBuffer(audioInfo, 'audio');
            const audioMenuPath = './assets/media/audios/audio-menu.mp3'; // Não mude isso 

            await writeFile(audioMenuPath, audioBuffer);
            return reply('🎶 - Áudio do Menu Salvo com *Sucesso* na Memória interna! ✅️');
        }

        global.audioMenu = !global.audioMenu;
        await writeFile('./assets/settings/global.json', JSON.stringify(global, null, 2));
        return reply('✅️ - O *ÁUDIO-MENU* foi ' +  (global.audioMenu ? '*Ativado*' : '*Desativado*') + ' Com sucesso! 🙇‍♀️' +
            (global.audioMenu ? '\n\n' +
                '-\n> Para definir o áudio, marque-o usando o mesmo comando: ' + setting.prefixo + command 
            : '')
        );
    }
});