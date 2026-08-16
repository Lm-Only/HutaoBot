import { WRT_FL } from '../../utils/generics.js';
import simi from '../../../assets/global/ia.json' with { type: 'json' };

let isDirty = false;

setInterval(() => {
    if (isDirty) {
        try {
            WRT_FL('./assets/global/ia.json', simi);
            isDirty = false;
        } catch {}
    }
}, 10000).unref();

export const educar = (type, info) => {
    const msg = info?.message;
    if (!msg) return;

    const wordRaw = msg.conversation || msg.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;

    if (typeof wordRaw !== "string" || wordRaw.length > 25) return;

    const word = wordRaw.toLowerCase();

    if (type === 'conversation') {
        if (simi[word]) return;

        simi[word] = { words: [] };
        isDirty = true;
        return;
    }

    if (type === 'extendedTextMessage') {
        const answerRaw = msg.extendedTextMessage?.text;
        if (typeof answerRaw !== 'string') return;

        const answer = answerRaw.toLowerCase();

        if (simi[word]) {
            simi[word].words.push(answer);
        } else {
            simi[word] = { words: [answer] };
        }

        isDirty = true;
    }
};

export const verificar = (wordRaw) => {
    if (typeof wordRaw !== 'string') return null;

    const entry = simi[wordRaw.toLowerCase()];
    if (!entry) return null;

    const words = entry.words;
    const len = words.length;

    if (len === 0) return null;
    if (len === 1) return words[0];

    return words[~~(Math.random() * len)];
};