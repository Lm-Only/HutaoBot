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
    'exemplo',
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
