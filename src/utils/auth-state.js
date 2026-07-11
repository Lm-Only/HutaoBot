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

import { Mutex } from 'async-mutex';
import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import {
    BufferJSON, 
    initAuthCreds,
    proto 
} from 'baileys';
const fileLocks = new Map();
const getFileLock = (path) => fileLocks.get(path) || fileLocks.set(path, new Mutex()).get(path);
export const useMultiFileAuthState = async (folder) => {
    const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-');

    const writeData = async (data, file) => {
        const filePath = join(folder, fixFileName(file));
        const mutex = getFileLock(filePath);
        const release = await mutex.acquire();
        try {
            await writeFile(filePath, JSON.stringify(data, BufferJSON.replacer));
        } 
        finally {
            release();
        }
    };
    const readData = async (file) => {
        try {
            const filePath = join(folder, fixFileName(file));
            const mutex = getFileLock(filePath);
            const release = await mutex.acquire();
            try {
                const data = await readFile(filePath, { encoding: 'utf-8' });
                return JSON.parse(data, BufferJSON.reviver);
            } 
            finally {
                release();
            }
        } 
        catch {
            return null;
        }
    };
    const removeData = async (file) => {
        try {
            const filePath = join(folder, fixFileName(file));
            const mutex = getFileLock(filePath);
            const release = await mutex.acquire();
            try {
                await unlink(filePath);
            } 
            catch {} finally {
                release();
            }
        } catch {}
    };
    await mkdir(folder, { recursive: true });
    const creds = (await readData('creds.json')) || initAuthCreds();
    return {
        state: {
            creds,
            keys: {
                get: async (type, ids) => {
                    const data = {};
                    await Promise.all(
                        ids.map(async (id) => {
                            let value = await readData(`${type}-${id}.json`);
                            if (type === 'app-state-sync-key' && value) {
                                value = proto.Message.AppStateSyncKeyData.fromObject(value);
                            }
                            data[id] = value;
                        })
                    );
                    return data;
                },
                set: async (data) => {
                    const tasks = [];
                    for (const category in data) {
                        for (const id in data[category]) {
                            const value = data[category][id];
                            const file = `${category}-${id}.json`;
                            tasks.push(value ? writeData(value, file) : removeData(file));
                        }
                    }
                    await Promise.all(tasks);
                }
            }
        },
        saveCreds: async () => writeData(creds, 'creds.json')
    };
};
