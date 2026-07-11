import {
    readFileSync,
    existsSync
} from 'fs';

import {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid
} from './exif.js';
import { getBuffer } from '../../handler.js';

const sendImageAsSticker = async (conn, jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : existsSync(path) ? readFileSync(path) : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
    } else {
        buffer = await imageToWebp(buff);
    }

    await conn.sendMessage(jid, {
        sticker: {
            url: buffer
        },
        ...options
    }, {
        quoted
    })
    return buffer;
};
const sendVideoAsSticker = async (conn, jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : existsSync(path) ? readFileSync(path) : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
    } else {
        buffer = await videoToWebp(buff);
    }
    await conn.sendMessage(jid, {
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
    sendVideoAsSticker,
    sendImageAsSticker
};
