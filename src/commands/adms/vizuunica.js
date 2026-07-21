
/** 
 * Feito oficialmente por Lm Only
 * - Uso de Ia nao esta incluso
 * 
 * @author Lm Only
 */

import { hutao } from "../system.js";
import { getDataGroup } from "../../handler.js";
import { setting, WRT_FL } from "../../utils/generics.js";

import txt from '../../messages/messages.js';

hutao.setCommand({
    name: 'Visu Unica',
    description: 'Ativa/desativa a obrigatoriedade de enviar fotos e vídeos apenas em visualização única',

    commands: [
        'visuunica',
        'vizuunica',
        'vizu-unica',
        'visu-unica'
    ],
    execute: async ({ 
        isAdm,
        isGroup,
        from,
        reply,
    }) => {
        if (!isGroup) return reply(txt.only_group);
        if (!isAdm) return reply(txt.only_adm);

        const DATA_GROUP_PATH = `./assets/groups/activation/${from}.json`;
        const dataGroup = getDataGroup(DATA_GROUP_PATH);

        dataGroup[0].vizuunica = !dataGroup[0].vizuunica;
        getDataGroup(DATA_GROUP_PATH, {
            update: true,
            data: dataGroup
        });
        WRT_FL(DATA_GROUP_PATH, dataGroup);

        react(dataGroup[0].vizuunica ? '✅' : '❌');
        reply(dataGroup[0].vizuunica ?
            `❰ *Modo Visualização Única Ativado* ❱\n\nA partir de agora, fotos e vídeos enviados neste grupo que não forem em visualização única serão apagados automaticamente.\n\n${setting.NomeDoBot}`
            : `❰ *Modo Visualização Única Desativado* ❱\n\nAs fotos e vídeos voltaram ao normal, sem restrição.\n\n${setting.NomeDoBot}`);
    }
});