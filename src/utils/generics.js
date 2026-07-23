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

import util from 'node:util';
import colors from 'colors';
import chalk from 'chalk';

import * as linkify from 'linkifyjs';

import { downloadContentFromMessage, delay } from 'baileys';
import { rm } from 'node:fs/promises';
import { mainLogger } from './logger.js';
import { getBuffer } from "../handler.js";
import { fileTypeFromBuffer } from 'file-type';
import { readFile, writeFile } from 'node:fs/promises';
import { writeFileSync, unlinkSync } from 'node:fs';
import { extension } from 'mime-types';
import { usedCommandRecently } from './cache.js';
import {
    parse as yamlParse,
    stringify as yamlStringify
} from 'yaml';

const contentTextFile = await readFile('./assets/settings/settings.yaml', 'utf-8');

// Arquivo central de configurações
export const setting = yamlParse(contentTextFile);

// Atualizar configurações
export const writeSettings = () => {
    void writeFile('./assets/settings/settings.yaml', yamlStringify(setting));
    return -1;
};

/** 
 * segurança - checar versão do node 
 * 
 * @param {Number} version - versão do node
 * 
 */
export const checkNodeVersion = (version) => {
    const versionNow = process.versions.node;
    const nodeVersion = parseInt(versionNow.split('.')[0], 10);
    
    return {
        ok: nodeVersion >= version,
        now: versionNow
    };
};

/**
 *  Numeros - remover strings 
 * 
 * @param {Number} number - numero (telephone e etc) 
 */
export const onlyNumber = (number) => number.replace(/[^\d]/g, '');

/**
 * Normalizador de string
 * util para eliminar caracteres
 * 
 * @param {string} query 
 * @returns {string}
 */
export const stringNormalize = (query) => query.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/** Simular "digitando" */
export const write = async (text) => {
    for (let i = 0; i < text.length; i++) {
        process.stdout.write(text[i]);
        await delay(15);
    }
};

/**
 * 
 * @param {string} text - texto para questão
 * @param {boolean} isWrite - animation (on/off)
 * @returns {<promisse>}
 */
export const question = (text = '', isWrite = false) => {
    if (isWrite) {
        write(text);
    } else {
        process.stdout.write(text);
    }

    return new Promise(resolve => {
        const onData = data => {
            process.stdin.removeListener('data', onData);
            resolve(data.toString().trim());
        };

        process.stdin.once('data', onData);
    });
};

/** 
 * Número unix para arquivos 
 * Para arquivos temporarios
 * 
 * @param {string|null} ext - extensão se preferir
 */
export const getUnixNumber = (ext = '') => Math.floor(Date.now()).toString() + ext;

/**
 * 
 * @param {string} session - caminho da sessão
 * @param {string|null} output - texto de saida
 */
export const deleteSession = async (session, output) => {
    await rm(session, {
        recursive: true,
        force: true
    });
    mainLogger.info(colors.green(output || "Pasta do qr-code deletada. " +
        "Execute 'npm start' para iniciar."));
};

/**
 * Baixa uma midia do whatsapp
 * 
 * @param {Object} mediakey - info->message
 * @param {String} MediaType - tipo de midia (audio, video, sticker e imagem)
 * @returns {Promise<buffer>}
 */
export const getFileBuffer = async (mediakey, MediaType) => {
    const stream = await downloadContentFromMessage(mediakey, MediaType);
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};

/**
 * 
 * @param {string} url - url a ser verificada
 * @param {object|null} opts - parametros adicionais
 * @returns {boolean|array} com opts | sem opts
 */
export const isUrl = (url, opts = {}) => {
    const result = linkify.find(url);
    if (!result.length) return null;
    if (opts.arrayValues) {
        return result.map(i => i.value);
    }
    return result[0].value;
};

/** Obter dispositivo através de um id de mensagem */
export const getDevice = (id) => id.length > 21 ? 'Android 🗿' : (id.startsWith('3E') ? 'WhatsApp web 👽' : 'IOS 💸');

/** Elementos aleatórios de um Array */
export const arrayRandom = (array) => {
    if (!array || !array.length) {
        return [];
    }
    const length = array.length;
    return array[Math.floor(Math.random() * length)];
};

/** Console info limpo */
const originalConsoleInfo = console.info;
console.info = function (...args) {
    if (!util.format(...args).includes('SessionEntry')) {
        originalConsoleInfo.apply(console, args);
    }
};

/**
 * 
 * @param {string} param caminho ou url
 * @returns {object} { image: Buffer } ou { video: Buffer, gifPlayback: boolean }
 */
export const getAnyMedia = async (param) => {
    try {
        const buffer = param.startsWith('http') ? (await getBuffer(param)) : (await readFile(param));
        const arrayTypes = ['jpg', 'png', 'webp'];
        const fileTypeData = await fileTypeFromBuffer(buffer);
        const fileType = fileTypeData?.ext;
        const type = arrayTypes.includes(fileType) ? 'image' : 'video';

        return { [type]: buffer, gifPlayback: Boolean(type === 'video') };
    } catch (e) {
        if (e.code === 'ENOENT') {
            throw `[ ERROR ] - Falha ao acessar a mídia no diretório "${e.path || 'Desconhecido'}", verifique se a mídia existe ou foi deletada por acidente. Use o comando "FotoMenu" no whatsapp juntamente com uma mídia para substituir.`;
        }

        throw 'Falha ao obter a mídia, provavelmente não foi encontrada ou está inválida\n' + e;
    }
};

/**
 * escreve arquivos de forma mais facil
 * 
 * @param {string} file - caminho da url
 * @param {object|array} jsonType - conteudo da json
 * @param {number|null} formatting - formatação da json
 */
export const WRT_FL = (file, jsonType, formatting = 0) => {
    try {
        writeFileSync(file, JSON.stringify(jsonType, null, formatting));
    } catch (e) {
        console.error(e);

    }
};

/**
 * Apaga arquivos
 * 
 * @param {string} file - diretorio do arquivo
 */
export const DLT_FL = (file) => {
    try {
        unlinkSync(file);
    } catch { }
};

/**
 * Escreve um arquivo qualquer
 * o nome é saveJson pq era usado pra salvar json
 * nao pode ser substituido pq é usado em varios lugares
 * 
 * @author Lm Only
 * @param {string} path - caminho do arquivo
 * @param {any} data qualquer coisa
 */
export const saveJson = (path, data) => {
    try {
        writeFileSync(path, data)
    } catch { }
};

/** Formatar segundos para dias, horas, minutos e segundos */
export const temporizador = (seconds) => {
    const pad = (s) => (s < 10 ? '0' : '') + s;
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${pad(days)} dias ${pad(hours)} horas ${pad(minutes)} minutos ${pad(secs)} segundos`;
};

/** colorir terminal com um texto e o nome da cor */
export const color = (text, color) => !color ? chalk.green(text) : chalk[color](text);

/** Obter a extensão de uma midia */
export const getExtension = (type) => extension(type);

/** clock clock clock */
export const cronometro = (timestamp) => {
    let dataAtual = new Date();
    let diferenca = dataAtual.getTime() - timestamp;
    let horas = Math.floor(diferenca / (1000 * 60 * 60));
    let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    let milissegundos = diferenca % 1000;
    let ano = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 30 * 12));
    let meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 * 24 * 30));
    return `${horas} horas, ${minutos} minutos, ${segundos} segundos e ${milissegundos} milissegundos.`;
};

/** anti flood - check if users exists */
export const isFiltered = (userId) => usedCommandRecently.has(userId);

/** anti flood - add user + timeout to delete user */
export const addFilter = (userId) => {
    usedCommandRecently.add(userId);
    setTimeout(() => {
        usedCommandRecently.delete(userId);
    }, 2000);
};

