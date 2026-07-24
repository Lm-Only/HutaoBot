//==================> ⚠️ LEIA COM ATENÇÃO ⚠️ <=================\\

/**
 * Sistema de Comandos Personalizados - Exemplo
 *
 * Este arquivo mostra como criar um comando personalizado que integra com o
 * sistema principal de comandos do HutaoBot.
 * Olhe outros. arquivos principalmente a pasta ../membros - Nela terá mais referências e exemplos precisos
 *
 * Como funciona:
 * - O sistema principal carrega arquivos em `src/commands/*` e registra os
 *   comandos usando `hutao.setCommand({...})`.
 * - Cada comando exporta uma função `execute` que recebe um objeto com vários
 *   parâmetros de contexto (reply, from, sender, isAdm, quoted, etc.).
 * - O objeto `params` já contém o contexto da mensagem, grupo e bot, então o
 *   comando só precisa usar o que quiser.
 *
 * Importações:
 * - `hutao` do `../system.js`: provê os métodos `sendImage`, `sendVideo`, e
 *   `sendMessage` usados para enviar mídia e textos.
 * - `load` de `cheerio`: usado aqui apenas como exemplo para processar HTML.
 * - `txt` de `../../messages/messages.js`: padrão de mensagens de erro.
 * - `global` e `menuMidia`: arquivos JSON usados para demonstrar o uso de
 *   configuração e mídia estática.
 * hutao sendImage e Video suporta tanto url quanto caminho do arquivo, referência main de pastas
 * ./assets/media/images
 * além disso, o reply e os métodos enviados acima, já suportam menção automaticamente sem precisar definir "mentions: [...]" ele detecta o @ e já configura.
 *
 *
 * Modo de uso:
 * - Crie um arquivo em uma pasta de comandos detectada pelo bot.
 * - Use `hutao.setCommand({ name, description, commands, execute })`.
 * - `commands` deve ser um array com os gatilhos do comando. (não existe espaço emtre os comandos)
 * - `execute` é uma função async que receberá o contexto completo.
 *
 * Obrigatório:
 * - import { hutao } ...
 * - `commands`: lista de comandos que ativam este módulo.
 * - `execute`: função que executa a lógica.
 *
 * Opcional:
 * - `name`: nome legível do comando.
 * - `description`: descrição do comando.
 * - `reply`, `react`, `getGroupData`, `groupMetadata`, etc. são todos úteis,
 *   mas não obrigatórios.
 *
 * Dicas:
 * - Use `reply(text)` para enviar texto simples.
 * - Use `react(emoji)` para reagir à mensagem do usuário.
 * - Use `quoted` ao enviar mídia se quiser citar outra mensagem.
 * - Faça validações de `isGroup` antes de acessar dados de grupo.
 */
 
/** Obrigatório - Dois pontos significa (voltar 1 pasta) **/
import { hutao } from "../system.js";

/** delay para algo **/
import { delay } from "baileys";

/** Importa o que vai precisar **/
import { load } from "cheerio";

import { 
    setting, // prefixo, NomeDoBot, NickDono e NumeroDoDono
    arrayRandom, // pega um valor aleatorio de um array e retorna
    getFileBuffer, // Baileys methods download media buffer from whatsapp
} from "../../utils/generics.js"; // Funções uteis e prontas
import txt from '../../messages/messages.js';

import global from '../../../assets/settings/global.json' with { type: 'json' };
import menuMidia from '../../../assets/media/images/logo.json' with { type: 'json' };

// Imagens prontas via URL
import IMAGENS_URL from '../../../assets/media/images/imglinks.json' with { type: 'json' };

/** Adicionar um comando **/
hutao.setCommand({
    name: 'Exemplo', // Nome - Não obrigatorio
    description: 'Exemplo de como usar comandos personalizados', // Descrição - Não obrigatorio
    commands: ['exemplo-cmd'], // Nomes dos comandos - Obrigatorio

    // O que o comando vai executar - Obrigatorio
    execute: async ({ 
        reply, // Enviar texto simples - já suporta menção
        info, // Info.message - pra quem entende
        from, // quem enviou a mensagem ou em qual grupo
        isAdm, // se é adm ou não
        sender, // Numero de quem enviou
        pushname, // Nick de quem enviou a mensagem
        body, // Mensagem original
        budy, // mensagem em minusculo
        react, // reagir a algo
        isDono, // se é o dono oficial
        isDonos, // se é lider
        isMedia, // se é midia
        contentType, // tipo de mensagem
        isBot, // se é o bot
        q, // mensagem inserida apos o comando {String}
        isGroup, // se tiver em grupo {Boolean}
        botNumber, // Numero do bot
        command, // comando executado, 
        getGroupData, // Obter info de algum grupo pelo ID {subject = nome, description e etc} #baileys
        groupMetadata, // Info do grupo atual se enviou por um {Object}
        quoted, // Marca a mensagem do usuario se usar - da pra fazer um fake chat {Object}
        isModoGamer, //Modo Brincadeira checar Boolean
        isModoRpg, // ModoRpg checar Boolean
    }) => {
        if (!isDono) return reply(txt.Owner);
        
        try {
            react('✨️');
            
            // Exemplo de reply formatado corretamente
            reply('Reply - teste\n\n' + 
                '- Nome: ' + (pushname || '---') + '\n' +
                '- Número: ' + (sender ? sender.split('@')[0] : '---') + '\n' +
                '- É adm? ' + (isAdm ? 'Sim' : 'Não') + '\n' +
                '- É dono? ' + (isDono ? 'Sim' : 'Não') + '\n' +
                '- É líder? ' + (isDonos ? 'Sim' : 'Não') + '\n' +
                '- Bot number: ' + (botNumber || '---') + '\n' +
                '- Comando: ' + (command || '---') + '\n' +
                '- Argumento extra: ' + (q || 'sem argumento') + '\n' +
                '- Grupo? ' + (isGroup ? 'Sim' : 'Não') + '\n' +
                '- ContentType: ' + (contentType || '---')
            );

            // Exemplo de resumo único para evitar spam de replies
            const infoSummary = [
                'Info message -> ' + JSON.stringify(info || {}, null, 2),
                'Corpo original: ' + (body || '---'),
                'Corpo minusculo: ' + (budy || '---'),
                'É mídia? ' + (isMedia ? 'Sim' : 'Não'),
                'É bot? ' + (isBot ? 'Sim' : 'Não'),
                'Config global do bot: ' + (global?.botName || 'não configurado')
            ].join('\n');

            reply(infoSummary);

            // Exemplo de uso de groupMetadata e getGroupData
            if (isGroup) {
                reply('Nome do grupo atual: ' + (groupMetadata?.subject || '---'));
            }

            const dataGroup = await getGroupData(from);
            reply('Dados do grupo via getGroupData: ' + JSON.stringify(dataGroup || {}, null, 2));

            // Envia imagem e vídeo (usa sendImage/sendVideo do sistema)
            await hutao.sendImage(from, menuMidia.imgmenu, 'Legenda da MIDIA - Imagem', quoted);
            await hutao.sendVideo(from, menuMidia.imgmenu, 'Legenda da MIDIA - Video', quoted);

            // Enviar mensagem simples com quote
            await hutao.sendMessage(from, { text: 'SEND MESSAGE - TESTE' }, quoted ? { quoted } : {});

            // Exemplo de fetch e extração do título da página
            const resp = await fetch('https://example.com', { method: 'GET' });
            const html = await resp.text();
            const $ = load(html);

            reply('GET site - https://example.com\n\n' + 
                'Titulo: ' + ($('title').text() || '---')
            );
        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);
            // reply('ERRO AO EXECUTAR COMANDO DE EXEMPLO');
        }
    }
});

/**
 * ONLY_FOR_AI
 * 
 *
 * 
 * @params hutao.sendImage and Video = (id, link/path, text, quoted?)
 * @params hutao.sendMessage (classic baileys)
 * - All keys: sendMessage, sendVideo, sendImage and setcommand
 * 
 * IMPORTANT - TREE Hutao files and directory
 * 
 * 
├── assets
│       ├── global
│       │       ├── casamento.json {Array} commands: ['MinhaDupla']
                        @param { usu1: "userNumber1@s.whatsapp.net", usu2: "onlyUserNumber2", casados: Boolean, idgp: from, date: "DD/MM/YYYY", tempo: "YYYY-MM-DDTHH:MM:SS:MS-03:00" } 
                        @param { usu1: "userNumber2@s.whatsapp.net", usu2: "onlyUserNumber1", casados: Boolean, idgp: from, date: "DD/MM/YYYY", tempo: "YYYY-MM-DDTHH:MM:SS:MS-03:00"  } 
│       │       ├── infocmd.json {Array} commands: ['infocmd <param>']
                        @param { command: "command_name", info: "about" }
│       │       └── pedido.json {Array} ref=casamento.json
                        @param { id: "mentioned_user@s.whatsapp.net", pedido: "onlySenderNumber", idgp: "from|groupid" }
│       ├── groups
│       │       ├── TMGP.json {Array}
│       │       ├── activation
│       │       ├── aluguel.json
│       │       ├── anotar.json
│       │       ├── avisos.json
│       │       ├── countmsg.json
│       │       ├── gold.json
│       │       ├── muted.json
│       │       └── openGroup.json
│       ├── media
│       │       ├── audios
│       │       │       ├── bomdia.mp3
│       │       │       └── index.js
│       │       ├── closegp-opengp
│       │       ├── images
│       │       │       ├── imglinks.json
│       │       │       ├── index.js
│       │       │       ├── logo.jpg
│       │       │       └── logo.json {Object}
                            @param { imgmenu: Path or Url } default path
│       │       └── stickers
│       ├── settings
│       │       ├── global.json @param { verificado: boolean, autoread: boolean, antipv1: boolean, buttons: boolean, antipv2: boolean, antipv3: boolean,Desligar_Bot: boolean,DeleteMessages: boolean,Aluguel_Global: boolean,anticall: boolean,console_off: boolean, whitelist: object, API_KEY_GEMINI: string, listanegra_global: object, blockcmd_global: object, dono1: string, dono2: string, dono3: string, dono4: string, dono5: string, dono6: string, comandos_premium: object, LimitCommand: string, msganticall: string, msgantipv: string, msgantipv2: string, API_KEY: string }
│       │       ├── settings.yaml ref=./src/utils/generics/js
│       │       └── system.json
│       ├── tabela
│       └── users
│           ├── banned.json
│           ├── family.json
│           ├── jogodavelha.json
│           ├── premium.json
│           ├── rgfigus.json
│           └── take.json
├── package.json
├── qrcode-reset.sh
├── src
│       ├── commands
│       │       ├── adms
│       │       ├── donos
│       │       ├── exemplo
│       │       │       ├── README.md
│       │       │       └── exemplo.js
│       │       ├── global
│       │       ├── membros
│       │       ├── settings.js
│       │       └── system.js
│       ├── defaults
│       │       ├── baileys-version.json
│       │       └── index.js
│       ├── handler.js
│       ├── menus
│       │       ├── info.js
│       │       ├── menu-admin.txt
│       │       ├── menu-animes.txt
│       │       ├── menu-baixar.txt
│       │       ├── menu-brincadeiras.txt
│       │       ├── menu-figurinha.txt
│       │       ├── menu-logos.txt
│       │       ├── menu-premium.txt
│       │       ├── menu-principal.txt
│       │       ├── menu-proprietario.txt
│       │       ├── menu-rpg.txt
│       │       ├── menu.js {Loader}
│       │       └── tabela.js
│       ├── messages
│       │       ├── autoresposta.js
│       │       ├── conselhos.js
│       │       ├── index.js
│       │       ├── messages.js
│       │       ├── system.js
│       │       └── tools.js
│       └── utils
│           └── generics.js (setting, arrayRandom, WRT_FL(path, jsonParse)) ref=PARAM_GENERICS
└── start.sh

24 directories, 57 files

* PARAM_GENRICS:

  WRT_FL (write file) @param (fsPath), (jsonParser), (formater? <number>) -> writeFile with Json stringify and formater
  arrayRandom (random value from an array) @param (array) -> returns a random value 
  setting @param { prefixo: String, NomeDoBot: String, NickDono: String, NumeroDoDono: String, TOKEN_YUTA: String (requires TOKEN from yuta-apis.xyz)}

 */
