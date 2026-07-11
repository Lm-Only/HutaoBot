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
import P from 'pino';
import colors from 'colors';
export const logger =  P({ level: 'silent' });
export const mainLogger = {
    info: (msg) => console.info(`[ ${colors.green('INFO')} ] - ${msg}`),
    error: (msg) => console.error(`[ ${colors.red('ERROR')} ] - ${msg}`),
    success: (msg) => console.log(`${colors.bgGreen('[ SUCCESS ]')} - ${msg}`)
};