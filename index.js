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

import colors from 'colors';
import { loadConnection } from './src/main.js';
import { mainLogger } from './src/utils/logger.js';
import { checkNodeVersion } from './src/utils/generics.js';

process.on('uncaughtException', (event) => {
    if (event.code === 'ENOSPC') {
        mainLogger.error(colors.red('ENOSPC detectado, limite de ' + 
            'watchers atingido, reinicializando núcleo...'));
    } else {
        mainLogger.error(colors.red('Erro não capturado: '));
        console.error(event);
    }

    process.exit(1);
});

(function () {
    const nodeVersion = checkNodeVersion(20);
    if (!nodeVersion.ok) {
        mainLogger.error(colors.red(
            '⚠️ É necessário a versão >=20 do nodeJS. ' +
            `Você atualmente está usando a versão: "${nodeVersion.now}" ` +
            'Atualize seu node ou aumente a versão.'
        ));
        process.exit(1);
    }
    void loadConnection();
})();
