//==================> ⚠️ LEIA COM ATENÇÃO ⚠️ <=================\\

/**
 * Sistema de Comandos Personalizados - Exemplo
 *
 * Este arquivo mostra como criar um comando personalizado que integra com o
 * sistema principal de comandos do HutaoBot.
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

/** Importa o que vai precisar **/
import { load } from "cheerio";
import txt from '../../messages/messages.js';

import global from '../../../assets/settings/global.json' with { type: 'json' };
import menuMidia from '../../../assets/media/images/logo.json' with { type: 'json' };

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
        q, // mensagem que fica ao lado de um comando
        isGroup, // se tiver em grupo
        botNumber, // Numero do bot
        command, // comando executado,
        getGroupData, // Obter info de algum grupo pelo ID {subject = nome, description e etc} #baileys
        groupMetadata, // Info do grupo atual se enviou por um {Object}
        quoted, // Menssagem de exemplo - da pra fazer um fake {Object}
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

