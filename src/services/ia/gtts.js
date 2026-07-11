import { writeFile } from 'node:fs';
import { request } from 'undici';

const BASE_URL = 'https://translate.google.com/translate_tts';
const MAX_CHARS = 100;

export function Text2Speech(lang = 'pt') {
    const idioma = lang.toLowerCase();

    return {
        save: async (filepath, text, callback) => {
            try {
                const partes = dividirTexto(text);
                const total = partes.length;

                for (let i = 0; i < total; i++) {
                    const args = gerarArgs(idioma, partes[i], i, total);
                    const {
                        body
                    } = await request(BASE_URL + args, {
                        method: 'GET',
                        headers: {
                            'User-Agent': 'Mozilla/5.0'
                        }
                    });

                    const buffer = Buffer.from(await body.arrayBuffer());
                    writeFile(filepath, buffer, callback);
                }
            } catch (err) {
                console.error('[GTTS]', err);
                if (callback) callback(err);
            }
        }
    };
}

function gerarArgs(lang, text, index, total) {
    const encoded = encodeURIComponent(text);
    return `?ie=UTF-8&tl=${lang}&q=${encoded}&total=${total}&idx=${index}&client=tw-ob&textlen=${text.length}`;
}

function dividirTexto(text) {
    if (!text) throw new Error('Texto vazio');
    const partes = [];
    let buffer = '';

    for (const palavra of text.split(' ').slice(1)) {
        if ((buffer + palavra).length > MAX_CHARS) {
            partes.push(buffer.trim());
            buffer = palavra + ' ';
        } else {
            buffer += palavra + ' ';
        }
    }
    if (buffer.trim()) partes.push(buffer.trim());
    return partes;
}
