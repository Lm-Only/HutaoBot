import { hutao } from "../system.js";
import { WRT_FL } from "../../utils/generics.js";

import txt from '../../messages/messages.js'

import global from '../../../assets/settings/global.json' with { type: 'json' };

hutao.setCommand({
    name: 'Buttons',
    description: 'Comando de ativar e desativar os botões do bot',

    commands: [ 
        'botoes',
        'bottoes',
        'buttons'
    ],

    execute: async ({
        reply,
        isDono
    }) => {
        if (!isDono) return reply(txt.Owner);

        global.buttons = !global.buttons;
        WRT_FL('./assets/settings/global.json', global, 2);

        reply('*BOTÕES ' + (global.buttons ? 'ATIVADO' : 'DESATIVADO') + ' COM SUCESSO* 🙇‍♀️' +
            (
                global.buttons ? '\n> Agora o bot irá enviar algumas mensagems com botões (tipo o menu)' +
                '\n-\n> 💡 *Dica:* No diretório `src->commands->buttons-config.js` você pode configurar os botões do bot' 
                : ''
            ) 
        );
    }

});