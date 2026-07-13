/**
 * HutaoBot pro versão 10.0.0
 * By: Lm Only
 * 
 * SELO: ❌️
 * 
 * ⚠️ Este codigo é aberto, mas atenção!! ⚠️
 * 
 * - Não confie em fazer alterações neste script
 * - Pois é de certeza que estes dados podem ser substituidos automaticamente.
 * - Os arquivos com permissão para editar devem ter o SELO: ✅️
 * 
 * - Não que isso seja proibido, pois sei que tem ums enzo que confunde 
 * - E tenta alterar só pra parecer o fodastico da web
 * 
 * - É mais questão de segurança e preocupação.
 */

import { WRT_FL } from '../../utils/generics.js';

import simi from '../../../assets/global/ia.json' with { type: 'json' };

/**
 * Faz o simi decorar palavras para responder
 * @param {String} [Word|Keyword] - Inputs de palavras
 */
export const educar = (type, info) => {
    let word = info.message?.conversation || info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || null;

    if (typeof word !== "string" || word.length > 25) {
        return null;
    }

    word = word.toLowerCase();

    if (type == 'conversation') {
        if (simi[word]) return;
        simi[word] = {
            words: []
        };
        WRT_FL('./assets/global/ia.json', simi);
        return;
    }
    if (type == 'extendedTextMessage') {
        if (simi[word]) {
            simi[word].words.push(info.message?.extendedTextMessage?.text?.toLowerCase());
            WRT_FL('./assets/global/ia.json', simi);
            return;
        }

        simi[word] = {
            words: [info.message?.extendedTextMessage?.text?.toLowerCase()]
        };
        WRT_FL('./assets/global/ia.json', simi);
        return;
    }
};

/**
 * Verifica se contém uma palavra
 * @param {String} word
 * @return sting
 */
export const verificar = (word) => {
    word = word.toLowerCase();
    if (word && simi[word]?.words[0]) {
        const words = simi[word].words;
        return words[Math.floor(Math.random() * words.length)];
    }

    return null;
};
