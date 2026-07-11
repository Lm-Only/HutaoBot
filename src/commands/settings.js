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

export const PASTAS = [
    'adms',
    'membros',
    'donos',
    'global'
];

export const options = {
    debugMode: true, //False para desativar
    debugErrors: true, //Printa erros no console
    debugProcess: true //Printa processos realizados
};

export const NO_PREFIX_DANGEROUS_COMMANDS = [
    'nuke',
    'sair',
    'suicidio',
    'hutao',
    DEFAULT_IA_CONFIG.prefixName
]

//# Works_in=system.js,messageUpsert.js