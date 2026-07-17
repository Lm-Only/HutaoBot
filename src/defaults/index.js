/**
 * HutaoBot pro versão 10.0.0
 * By: Lm Only
 * 
 * SELO: ✅️
 * 
 * - Você pode editar a vontade, este script foi feito para nao ser alterado
 * - Em caso que for preciso ser feita uma alteração, será feito um backup 
 * - E o codigo antigo será substituido pelo novo. Mas voce pode ver o que mudou 
 * - E repassar.
 * 
 * -> Ainda não foi criado um sistema vibe github que consegue processar sem perder as alterações
 */

import colors from 'colors';

import { color, setting } from '../utils/generics.js';
import { SWP } from '../utils/jid-utils.js';

import version from './baileys-version.json' with { type: 'json' };

export const NOT_FOUND_COMMAND_REACT = {
    react: true,
    emoji: '❓'
};

export const DEFAULT_CONNECTION_CONFIG = {
    version,
    mobile: false,
    fireInitQueries: true,
    syncFullHistory: false,
    downloadHistory: false,
    emitOwnEvents: false,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    connectTimeoutMs: 20_000,
    keepAliveIntervalMs: 25_000,
    retryRequestDelayMs: 5000,
    maxMsgRetryCount: 5,
    defaultQueryTimeoutMs: 60_000,
    shouldSyncHistoryMessage: () => false
};

export const STATUS_CODES = {
    428: () => `[ ${colors.red('INFO')} ] - ${colors.red('Erro de conexão, iniciando novamente.')}`,
    401: () => `[ ${colors.yellow('WARNING')} ] - ${colors.red('O BOT FOI DESCONECTADO DO WHATSAPP, IREI APAGAR O QR-CODE. ( NÃO FECHE O BOT )')}`,
    515: () => `${colors.bgGreen('[ SUCCESS ]')} - ${colors.green('Conexão com o WhatsApp estabelecida com sucesso.')}`,
    408: () => `[ ${colors.red('ERROR')} ] - ${colors.red('Falha na conexão')}`,
    411: () => `[ ${colors.red('INFO')} ] - ${colors.red('Conexão fraca...')}`,
    440: () => `[ ${colors.yellow('WARNING')} ] - ${colors.red('Conexão substituída: uma nova sessão foi aberta e conectada.\n')} ${colors.gray('Por favor, reconectar o bot novamente.')}`,
    unknownError: () => `[ ${colors.red('INFO')} ] - ${colors.gray('Conexão fechada. Irei reiniciar meus sistemas!')}`
};

/**
 * Obs: este nao é o corpo da mensagem
 * é apenas aquela parte de menção 
 * tipo o de Meta AI e etc
 * Aqui eu uso o verificado padrao do bot
 * 
 * @param {Object} info info->message
 * @param {String} from GroupID
 * @param {Object} params {<boolean>verificaddo}
 * @returns {Object}
 * 
 * @author Lm Only
 */
export const DEFAULT_INFO = (info, from, params) => {
    return params.verificado ? {
        key: {
            fromMe: false,
            participant: '0' + SWP,
            ...(from ? {
                remoteJid: 'status@broadcast'
            } : {})
        },
        message: {
            imageMessage: {
                url: 'https://mmg.whatsapp.net/d/f/',
                mimetype: "image/jpeg",
                caption: setting.NomeDoBot
            }
        }
    } : info;
};

/**
 * Função que gera a mensagem de canal
 * Aquela de acessar canal né aff
 * 
 * @author Lm Only - Nk Petrov
 * 
 * @returns {Object}
 */
const gerarContextNewsletter = () => {
    if (setting.channel === "0@newsletter") {
        return {};
    }
    return {
        isForwarded: true, // Mensagem encaminhada
        forwardingScore: 1, // Encaminhou quantas vezes?
        forwardedNewsletterMessageInfo: {
            newsletterJid: setting.channel, // ID do canal - não mexa diretamente
            newsletterName: setting.NomeDoBot, // Nome do canal personalizado
            serverMessageId: '', // numero da mensagem do canal
        }
    };
};

/**
 * Isso aqui é o corpo padrao da mensagem
 * Você pode mexer a vontade da forma que bem entender
 * 
 * @returns {Object}
 */
export const DEFAULT_CONTEXT_INFO = () => {
    return {
        ...gerarContextNewsletter()
    }
};

/**
 * printa mensagens e comandos no console
 * você pode editar da forma que você quiser
 * fique a vontade, alias é a hutao V10.0.0 rs
 * 
 * @param {String} command comando enviado
 * @param {String} body mensagem completa
 * @param {String} pushName nome da pessoa
 * @param {String} sender id do usuario
 * @author adicionado por Lm Only
 * 
 * as info a cima é so para quem trabalha com desenvolvimento
 * você ingnora-las
 */
export const consolePrivado = (command, body, pushname, sender) => {
    const title = command ? "𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐍𝐎 𝐏𝐑𝐈𝐕𝐀𝐃𝐎" : "𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐍𝐎 𝐏𝐑𝐈𝐕𝐀𝐃𝐎";
    const details = command ? `║╎ ░⃟⃛ ➮𝙲𝙾𝙼𝙼𝙰𝙽𝙳\n ║╎ ↳ 『 ${color(body, "magenta")} 』` : `║╎ ░⃟⃛ ➮𝙼𝙴𝚂𝚂𝙰𝙶𝙴\n ║╎ ↳ 『 ${color(body, "magenta")} 』`;
    console.log(
        colors.brightBlue('\n ╭⊰᯽⊱ ━═━═━ ✿•ೋ°ೋ•✿ ━═━═━ ⊰᯽╮\n'),
        colors.brightBlue('║'), color(`  • ${title} •`, "magenta"), '\n',
        colors.brightBlue("╚⊰᯽⊱ ━═━═━ ✿•ೋ°ೋ•✿ ━═━═━ ⊰᯽╝\n"),
        colors.brightBlue("║╭━━━──━━━━──━━━━──━━╮\n"),
        colors.brightBlue("║╎ ░⃟⃛ ➮𝙽𝙸𝙲𝙺:"), color(pushname, "magenta"), '\n',
        colors.brightBlue("║╎ ░⃟⃛ ➮𝙽𝚄𝙼𝙱𝙴𝚁:"), color(sender.split("@")[0], "magenta"), '\n',
        colors.brightBlue(details), '\n',
        colors.brightBlue("║╰━━━──━━━━──━━━━──━━╯\n"),
        colors.brightBlue("╚⊰᯽⊱ ━═━═━ ✿•ೋ°ೋ•✿ ━═━═━ ⊰᯽╝")
    );
}

/**
 * printa mensagens e comandos no console
 * você pode editar da forma que você quiser
 * fique a vontade, alias é a hutao V10.0.0 rs
 * 
 * @param {String} command comando enviado
 * @param {String} body mensagem completa
 * @param {String} groupName nome do grupo
 * @param {String} pushName nome da pessoa
 * @param {String} sender id do usuario
 * @author adicionado por Lm Only
 * 
 * as info a cima é so para quem trabalha com desenvolvimento
 * você ingnora-las
 */
export const consoleGrupo = (command, body, groupName, pushname, sender) => {
    const title = command ? "𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐄𝐌 𝐆𝐑𝐔𝐏𝐎" : "𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐄𝐌 𝐆𝐑𝐔𝐏𝐎";
    const content = command ? `${color("░⃟⃛ ➮𝙲𝙾𝙼𝙼𝙰𝙽𝙳\n", "magenta")} ${color("║╎ ↳ 『", "magenta")} ${color(body, "cyan")} ${color("』", "magenta")}` :
        `${color("░⃟⃛ ➮𝙼𝙴𝚂𝚂𝙰𝙶𝙴\n", "magenta")} ${color("║╎ ↳ 『", "magenta")} ${color(body, "cyan")} ${color("』", "magenta")}`;

    console.log(
        color('\n ╭⊰᯽⊱ ━═━═━ ✿•ೋ°ೋ•✿ ━═━═━ ⊰᯽╮', 'magenta'), '\n',
        color('║', "magenta"), color(`  • ${title} •`, "cyan"), '\n',
        color("╚⊰᯽⊱ ━═━═━ ✿•ೋ°ೋ•✿ ━═━═━ ⊰᯽╝", "magenta"), '\n',
        color("║╭━━━──━━━━──━━━━──━━╮", "magenta"), '\n',
        color("║╎", "magenta"), color("░⃟⃛ ➮𝙶𝚁𝙾𝚄𝙿:", "magenta"), color(groupName, "cyan"), '\n',
        color("║╎", "magenta"), color("░⃟⃛ ➮𝙽𝙸𝙲𝙺:", "magenta"), color(pushname, "cyan"), '\n',
        color("║╎", "magenta"), color("░⃟⃛ ➮𝙽𝚄𝙼𝙱𝙴𝚁:", "magenta"), color(sender.split("@")[0], "cyan"), '\n',
        color("║╎", "magenta"), content, '\n',
        color("║╰━━━──━━━━──━━━━──━━╯", "magenta"), '\n',
        color("╚⊰᯽⊱ ━═━═━ ✿•ೋ°ೋ•✿ ━═━═━ ⊰᯽╝", "magenta")
    );
};

/**
 * isso aqui é as informações das mensagens a serem
 * enviadas. util para editar, por acessar canal e etc
 * 
 * @param {Object} opts não é necessario rs
 * @returns isso é só pro Lm, mas retorn object
 * @author Lm Only 
 */
export const headerSendMessage = (opts) => {
    return {
        text: opts.query,
        mentions: opts.mentions
    };
};

/**
 * para image rs - hutao V10.0.0
 */
export const headerSendImage = (url, opts) => {
    return {
        image: {
            url
        },
        caption: opts.query.trim(),
        mentions: opts.mentions
    };
};

/**
 * ⚠️ - Atenção!! Coloquei isso como codigo aberto para que você possa se adiantar primeiro de as atualizações.
 * As vezes alguma coisa muda na INFO, então você que entende, pode add aqui.
 * Tipo, as vezes tem gente que consegue mudar a forma da mensagem de pagamento.
 * Fazendo com que o bot não consiga detectar
 * 
 * @param {Object} param0 info.message
 */
export const PAYMENT_INFO_TO_DETECT = (message) => {
    return message?.requestPaymentMessage?.noteMessage;
};

/**
 * Modo RPG - durabilidade da picareta
 * alguem melhora isso pfvr
 * 
 * @param {number} CHECK_USER sla kkkk nada aver o nome, isso é antigo
 * @returns 
 */
export const Pct_Progress = (CHECK_USER) => {
    let PRCT = '*[▒▒▒▒▒▒▒▒▒▒] 0%*';

    if (CHECK_USER == 0) {
        PRCT = `*[▒▒▒▒▒▒▒▒▒▒] ${CHECK_USER}%*`;
    } else if (CHECK_USER <= 2) {
        PRCT = `*[█▒▒▒▒▒▒▒▒▒] ${CHECK_USER}%*`;
    } else if (CHECK_USER <= 4) {
        PRCT = `*[██▒▒▒▒▒▒▒▒] ${CHECK_USER + 14}%*`;
    } else if (CHECK_USER <= 6) {
        PRCT = `*[███▒▒▒▒▒▒▒] ${CHECK_USER + 21}%*`;
    } else if (CHECK_USER <= 8) {
        PRCT = `*[████▒▒▒▒▒▒] ${CHECK_USER + 43}%*`;
    } else if (CHECK_USER <= 10) {
        PRCT = `*[█████▒▒▒▒▒] ${CHECK_USER + 50}%*`;
    } else if (CHECK_USER <= 12) {
        PRCT = `*[██████▒▒▒▒] ${CHECK_USER + 55}%*`;
    } else if (CHECK_USER <= 14) {
        PRCT = `*[███████▒▒▒] ${CHECK_USER + 60}%*`;
    } else if (CHECK_USER <= 16) {
        PRCT = `*[████████▒▒] ${CHECK_USER + 65}%*`;
    } else if (CHECK_USER <= 18) {
        PRCT = `*[█████████▒] ${CHECK_USER + 70}%*`;
    } else if (CHECK_USER < 20) {
        PRCT = `*[██████████] ${CHECK_USER + 75}%*`;
    } else if (CHECK_USER == 20) {
        PRCT = `*[██████████] ${CHECK_USER + 80}%*`;
    }

    return PRCT;
};
