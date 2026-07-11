import { hutao } from '../system.js';

hutao.setCommand({
    name: 'get info',
    description: 'Obter informações de um evento de mensagens',
    commands: ['getinfo'],
    execute: async (opts) => {
        console.log(opts);
    }
});
