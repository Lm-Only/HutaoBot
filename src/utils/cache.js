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

import NodeCache from '@cacheable/node-cache';
export const msgRetryCounterCache = new NodeCache({
    stdTTL: 5 * 60,
    useClones: false
});
export const groupCache = new NodeCache({
    stdTTL: 5 * 60,
    useClones: false
});
export const cacheDataGroup = new NodeCache({
    stdTTL: 60, //60s
    checkperiod: 120, //Intervalos
    useClone: false
});
export const LMT_CMD = new Map();
export const usedCommandRecently = new Set();
