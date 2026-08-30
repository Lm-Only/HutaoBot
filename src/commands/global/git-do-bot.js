import { hutao } from '../system.js';

hutao.setCommand({
    name: 'git do bot',
    description: 'Mostra o git do bot?',

    commands: ['gitdobot'],
    execute: async ({
        reply
    }) => {
        reply('• *Aqui está o git da HutaoBot:*\n\n> https://github.com/Lm-Only/HutaoBot.git\n> `Deixe uma estrela!!! 🌟`');
    }
});
