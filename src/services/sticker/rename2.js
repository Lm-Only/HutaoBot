import {
    readFileSync,
    existsSync
} from 'fs';

import {
    imageToWebp2,
    videoToWebp2,
    writeExifImg2,
    writeExifVid2
} from './exif2.js';
import { getBuffer } from '../../handler.js';

const sendImageAsSticker2 = async ({ sendMessage }, jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : existsSync(path) ? readFileSync(path) : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
        buffer = await writeExifImg2(buff, options);
    } else {
        buffer = await imageToWebp2(buff);
    }

    await sendMessage(jid, {
        sticker: {
            url: buffer
        },
        ...options
    }, {
        quoted
    })
    return buffer;
};

const sendVideoAsSticker2 = async (switzg, jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : existsSync(path) ? readFileSync(path) : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
        buffer = await writeExifVid2(buff, options);
    } else {
        buffer = await videoToWebp2(buff);
    }

    await switzg.sendMessage(jid, {
        sticker: {
            url: buffer
        },
        ...options
    }, {
        quoted
    })
    return buffer;
}

export {
    sendVideoAsSticker2,
    sendImageAsSticker2
};