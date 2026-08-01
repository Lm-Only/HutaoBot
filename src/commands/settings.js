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

import { DEFAULT_IA_CONFIG } from "../ia/settings.js";

/**
 * - Organização apenas 
 * - Você pode adicionar mais pastas
 
 * OBS: Não significa que o bot vai detectar se é ADM ou DONO. É só pra organização mesmo.
 */
export const PASTAS = [
    'adms',
    'donos',
  //  'exemplo', //removido por segurança
    'global',
    'membros'
];


/**
 * - Mensagens iniciais 
 * - Notificando os comandos que estão sendo carregados
 *
 * DICA: troque por false para desativar
 */
export const options = {
    debugMode: true, //False para desativar
    debugErrors: true, //Printa erros no console
    debugProcess: true //Printa processos realizados
};


/**
 * - Evite que comandos perigosos sejam registrados
 */
export const NO_PREFIX_DANGEROUS_COMMANDS = [
    'nuke',
    'sair',
    'suicidio',
    'hutao',
    DEFAULT_IA_CONFIG.prefixName
];


/** Configs do comando de perfil */
export const COMANDO_PERFIL = {
    enviarAudio: true, // false - para desativar
    reaction: {
        active: true, // false - para não reagir
        emoji: '💖' // Reação do bot ao usar "perfil"
    }
};

/**
 * Este é o sistema de configuração do Aluguel
 * Edite os preços para quando a pessoa usar <prefixo>plano, o bot navegue entre os planos
 * OBS: os planos que você por na tabela é apenas visual
 * O bot vai pegar os preços daqui
 * 
 * Tabela em: "./src/menus/tabela-planos-bot.txt"
 */
export const ALUGUEL_CONFIG = {
    multiGrupos: true,
    planos: [
        {
            nome: 'Plano Bronze 🥉 - 7 dias', // Nome personalizado
            dias: 7, // dias - se for 2 meses é 60
            valor: 5, // se for 2,50R$ coloque 2.50
            ativo: true // verifica se o plano tá liberado (false - para desativar)
        },

        // Outros planos - adcione o quanto quiser
        {
            nome: 'Plano prata 🥈 - 15 dias',
            dias: 15,
            valor: 10,
            ativo: true
        },
        {
            nome: 'Plano Ouro 🥇 - 30 dias',
            dias: 30,
            valor: 20,
            ativo: true
        },
        {
            nome: 'Plano VIP 👑 - 60 dias',
            dias: 60,
            valor: 35,
            ativo: true
        },
    ]
};