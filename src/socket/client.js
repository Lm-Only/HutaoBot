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
import makeWASocket, { makeCacheableSignalKeyStore, isJidNewsletter } from 'baileys';
import { logger } from '../utils/logger.js';
import { useMultiFileAuthState } from '../utils/auth-state.js';
import { msgRetryCounterCache, groupCache } from '../utils/cache.js';
import { DEFAULT_CONNECTION_CONFIG } from '../defaults/index.js';
import sys_settings from '../../assets/settings/system.json' with { type: 'json' };
export class Client {
    constructor() {
        this.options = {};
        this.saveCreds = null;
        this.auth = sys_settings.auth_name;
        this.browser = sys_settings.browser;
    }
    async start() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(this.auth);
        this.saveCreds = saveCreds;
        this.options = {
            ...DEFAULT_CONNECTION_CONFIG,
            logger,
            browser: this.browser,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger),
            },
            msgRetryCounterCache,
            shouldIgnoreJid: (jid) => isJidNewsletter(jid)
        };
    }
    get session() {
        return this.auth;
    }
    connect() {
        return {
            saveCreds: this.saveCreds,
            ...makeWASocket(this.options)
        };
    }
}
