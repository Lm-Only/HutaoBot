import { hutao } from '../system.js';
import { setting } from '../../utils/generics.js';

hutao.setCommand({
    name: 'Trabalhar',
    description: 'Mandar alguém ir trabalhar',
    
    commands: ['trabalhar'],
    execute: async ({ 
        mention,
        sender,
        reply,
        react,
        command
    }) => {
        if (!mention) {
            return reply('• Mencione o "@" ou a mensagem de alguém. 🤷‍♀️\n' + "• `Exemplo: " + setting.prefixo + command + " @xuser`");
        }
        
        if (mention === sender) {
            return reply('🤔 Não entendi você...');
        }
        
        const TEXTO = `𓍯𓂃𓏧♡ *Ei* @${mention.split('@')[0]}\n\n` +
            `*O(a)* @${sender.split('@')[0]} mandou você ir *trabalhar* 💼😤`;
        react('😼');
        reply(TEXTO);
    }
});

