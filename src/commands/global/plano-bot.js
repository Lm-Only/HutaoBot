import { hutao } from "../system.js";
import { delay } from "baileys";

import { faltaConfigurar } from "./alugar-bot.js";
import { gerarPix, temChavePixConfigurada, temTokenMercadoPago } from '../../utils/pix.js';
import { registrarPagamento, registrarPagamentoManual } from '../../utils/pix-manager.js';
import { WRT_FL, onlyNumber, setting } from '../../utils/generics.js';
import { ALUGUEL_CONFIG } from '../settings.js';

import global from '../../../assets/settings/global.json' with { type: 'json' };
import aluguel from '../../../assets/groups/aluguel.json' with { type: 'json' };
import cliente from '../../../assets/users/cliente-aluguel.json' with { type: 'json' };

/**
 * Retorna apenas os planos marcados como ativos nas configurações.
 * @returns {Array} planos ativos
 */
const getPlanosAtivos = () => ALUGUEL_CONFIG.planos.filter(p => p.ativo);

const obterRenovacaoPendente = (sender) => {
    const groupId = cliente[sender];
    if (!groupId) return null;

    const registro = aluguel.find((item) =>
        item?.id === groupId && item?.cliente === sender
    );
    const vencido = Boolean(registro?.ended) || Number(registro?.time || 0) <= Math.floor(Date.now() / 1000);

    if (registro && vencido) return registro;

    delete cliente[sender];
    WRT_FL('./assets/users/cliente-aluguel.json', cliente, 2);
    return null;
};

const criarLinkConfirmacaoPix = (sender, plano, renovacao) => {
    const numeroDono = onlyNumber(String(setting?.NumeroDoDono || ''));
    if (numeroDono.length < 10 || numeroDono.length > 15) return null;

    const tipo = renovacao ? 'renovação de aluguel' : 'novo aluguel';
    const mensagem = [
        'Olá! Realizei o pagamento via PIX.',
        `Tipo: ${tipo}`,
        `Plano: ${plano.nome}`,
        `Valor: R$ ${Number(plano.valor || 0).toFixed(2)}`,
        `Meu número: ${sender.split('@')[0]}`,
        '',
        'Segue o comprovante do pagamento:'
    ].join('\n');

    return `https://wa.me/${numeroDono}?text=${encodeURIComponent(mensagem)}`;
};

/**
 * Monta o texto da lista de planos disponíveis.
 * @param {string} prefixo
 * @param {string} command
 * @returns {string}
 */
const textoListaPlanos = (prefixo, command) => {
    const planos = getPlanosAtivos();
    let texto =
        '🔮 *ESCOLHA UM PLANO* 🔮\n\n' +
        '• Envie o número do plano ao lado do comando:\n' +
        `> Exemplo: *${prefixo}${command} 1*\n\n`;

    for (let i = 0; i < planos.length; i++) {
        const p = planos[i];
        texto += `『 ${i + 1} 』➮  *${p.nome}*\n`;
        texto += `    • Duração: *${p.dias} dias*\n`;
        texto += `    • Valor: *R$ ${p.valor.toFixed(2)}*\n\n`;
    }

    return texto;
};

hutao.setCommand({
    name: 'Plano bot',
    description: 'Escolher plano e gerar PIX copia e cola para pagamento automático',

    commands: [
        'plano',
        'opcao'
    ],

    execute: async ({
        reply,
        sender,
        prefixo,
        command,
        q: query,
        pushname
    }) => {
        // Verifica se o auto-aluguel está configurado; se não, manda contato do dono
        if (await faltaConfigurar(reply, sender)) {
            return 0;
        }

        const planosAtivos = getPlanosAtivos();

        if (!planosAtivos.length) {
            return reply('❌️ - Não há planos disponíveis no momento. 🤷‍♀️');
        }

        // Sem argumento → exibir lista de planos
        if (!query || isNaN(query)) {
            return reply(textoListaPlanos(prefixo, command));
        }

        const numero = Number(query);

        if (!Number.isInteger(numero) || numero < 1 || numero > planosAtivos.length) {
            return reply(
                `❌️ - Opção *inválida*. Escolha um número entre *1* e *${planosAtivos.length}*.\n\n` +
                `> Use *${prefixo}${command}* para ver os planos disponíveis. 🙇‍♀️`
            );
        }

        const planoEscolhido = planosAtivos[numero - 1];
        const renovacao = obterRenovacaoPendente(sender);
        const contexto = {
            renovacaoId: renovacao?.id || null,
            pushname
        };
        const linkConfirmacaoPix = criarLinkConfirmacaoPix(sender, planoEscolhido, renovacao);
        const descricao = renovacao
            ? `renovar o grupo *${renovacao.name || renovacao.id}*`
            : `ativar o ${planoEscolhido.nome}`;

        if (!temTokenMercadoPago() && temChavePixConfigurada()) {
            await registrarPagamentoManual(sender, planoEscolhido, contexto);

            await reply(
                `🏦 *PIX PARA ${renovacao ? 'RENOVAÇÃO' : 'ALUGUEL'}*\n\n` +
                `• Você escolheu: *${planoEscolhido.nome}*\n` +
                `• Valor: *R$ ${planoEscolhido.valor.toFixed(2)}*\n` +
                `• Finalidade: *${descricao}*\n\n` +
                '⏳ Após pagar, envie o comprovante ao responsável pelo link que enviarei abaixo.\n' +
                '✅ Assim que ele confirmar, o bot continuará automaticamente com a ativação ou renovação.\n\n' +
                '📲 *Chave PIX ABAIXO:👇*'
            );
            await reply(global.CHAVE_PIX);

            if (linkConfirmacaoPix) {
                return reply(
                    '📩 *CONFIRMAR PAGAMENTO COM O RESPONSÁVEL*\n\n' +
                    '• Após fazer o PIX, toque no link, envie o comprovante e aguarde a confirmação:\n\n' +
                    linkConfirmacaoPix
                );
            }

            return reply('⚠️ Não consegui gerar o link de confirmação do responsável. Envie o comprovante ao dono do bot.');
        }

        await reply(
            `🔮 *Gerando PIX para ${descricao}...*\n` +
            `💰 Valor: *R$ ${planoEscolhido.valor.toFixed(2)}*\n\n` +
            '> Aguarde um momento... ⏳'
        );

        try {
            const pix = await gerarPix(planoEscolhido.valor);

            // Registrar pagamento no gerenciador (persiste e inicia verificação)
            await registrarPagamento(pix.id, sender, planoEscolhido, contexto);

            await delay(300);

            // Enviar QR Code como imagem com legenda
            if (pix.qr_code) {
                const imgBuffer = Buffer.from(pix.qr_code, 'base64');
                await hutao.sendMessage(sender, {
                    image: imgBuffer,
                    caption:
                        `🏦 *PIX — ${planoEscolhido.nome}*\n\n` +
                        `💰 Valor: *R$ ${planoEscolhido.valor.toFixed(2)}*\n` +
                        `📅 Duração: *${planoEscolhido.dias} dias*\n\n` +
                        '📲 Escaneie o QR Code *ou* use o *Copia e Cola* a seguir.'
                });

                await delay(400);
            }

            // Enviar copia e cola em texto separado para facilitar o clique
            await reply(
                '💳 *PIX COPIA E COLA* 💳\n\n' +
                '⏳ *Validade*: 30 minutos\n' +
                '✅ O pagamento será verificado automaticamente. Aguarde a confirmação! 🙇‍♀️'
            );
            await reply(pix.code);
        } catch (error) {
            console.error('[ PLANO ] Erro ao gerar PIX:', error);
            return reply(
                '❌ *Não foi possível gerar o PIX.* 😢\n\n' +
                '• Tente novamente em alguns instantes.\n' +
                '• Se o problema persistir, entre em contato com o suporte.'
            );
        }
    }
});