import { hutao } from "../system.js";

import txt from '../../messages/messages.js';
import { WRT_FL } from "../../utils/generics.js";

import global from '../../../assets/settings/global.json' with { type: 'json' };

import { pegarTabelaDoBot } from '../global/alugar-bot.js';
import { temChavePixConfigurada, temTokenMercadoPago } from '../../utils/pix.js';

hutao.setCommand({
    name: 'Auto Aluguel',
    description: 'Ativa e desativa o aluguel automático',

    commands: [
        'autoaluguel',
        'auto-aluguel',
        'auto_aluguel'
    ],

    execute: async ({
        isDono,
        reply
    }) => {
        if (!isDono) return reply(txt.Owner);

        // Desativa o aluguel automático
        if (global.AUTO_ALUGUEL) {
            global.AUTO_ALUGUEL = false;
            WRT_FL('./assets/settings/global.json', global, 2);

            return reply(
                `🌙 *Aluguel automático desativado!*\n\n` +
                `• O sistema de aluguel automático foi pausado com sucesso.\n` +
                `• Enquanto estiver desativado, o bot não realizará automaticamente ` +
                `o gerenciamento dos aluguéis.\n\n`
            );
        }

        // Ativa o aluguel automático
        global.AUTO_ALUGUEL = true;
        WRT_FL('./assets/settings/global.json', global, 2);

        let mensagem =
            '✨ `Aluguel automático Ativado!`\n\n' +
            `• O sistema de aluguel automático foi ativado com sucesso! 🟢\n` +
            `• Para garantir que tudo funcione corretamente, *LEIA* os passos abaixo: 👇\n\n`;

        // 1. Verifica PIX
        const tokenConfigurado = temTokenMercadoPago();
        const chaveConfigurada = temChavePixConfigurada();
        const pixNaoConfigurado = !tokenConfigurado && !chaveConfigurada;

        mensagem += '• 🙇‍♀️ `Configure o pagamento PIX`\n\n';

        if (pixNaoConfigurado) {
            mensagem +=
                `   • As informações do PIX ainda não foram configuradas.\n` +
                `   • 📁 Arquivo de configuração:\n` +
                '   *./assets/settings/global.json*\n\n' +
                `-> Configure sua *chave PIX* ou *token do mercado pago*` +
                ` para que o sistema possa processar os pagamentos automaticamente.\n\n`;
        } else {
            mensagem +=
                `> ✅ As configurações de pagamento PIX já estão definidas.\n` +
                `> ${tokenConfigurado ? '🤖 Mercado Pago: confirmação automática ativa.' : '👤 Chave PIX: confirmação feita manualmente pelo dono.'}\n\n`;
        }

        // 2. Verifica tabela
        const tabela = await pegarTabelaDoBot();

        const tabelaNaoConfigurada =
            !tabela ||
            tabela.startsWith('null');

        mensagem += '• 💎 `Configure a tabela de Aluguel`\n\n';

        if (tabelaNaoConfigurada) {
            mensagem +=
                `   • A tabela de planos ainda não foi configurada.\n` +
                `   • Defina o texto que será enviado aos clientes quando eles ` +
                `   consultarem os planos disponíveis para aluguel.\n\n` +
                `   • 📁 Arquivo:\n` +
                `   *./src/menus/tabela-planos-bot.txt*\n\n`;
        } else {
            mensagem +=
                `> ✅ A tabela de planos já está configurada.\n\n`;
        }

        // 3. Configuração dos planos
        mensagem +=
            '• 💸 `Personalize seus planos`\n\n' +
            `   • Você pode editar os planos, preços e períodos de aluguel ` +
            `   que serão apresentados aos seus clientes.\n\n` +
            `   • 📁 Arquivo de configuração:\n` +
            `   *./src/commands/settings*\n\n` +
            `   💡 Personalize os valores de acordo com os planos que deseja oferecer.\n\n`;

        mensagem +=
            `━━━━━━━━━━━━━━━━━━\n` +
            `✨ *Configuração concluída!*\n\n` +
            `Agora basta conferir os itens acima e personalizar o sistema ` +
            `de acordo com suas necessidades. 🚀`;

        return reply(mensagem);
    }
});