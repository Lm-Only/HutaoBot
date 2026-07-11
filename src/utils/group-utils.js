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

import { isJidGroup, proto, prepareWAMessageMedia } from 'baileys';
import { groupCache } from './cache.js';

/** Obter administradores de um grupo */
export const getGroupAdmins = (participants) => participants.filter(v => v.admin).map(v => v.phoneNumber || v.id);

/** Obter membros de um grupo */
export const getMembros = (participants) => participants.filter(v => !v.admin).map(v => v.phoneNumber || v.id);
