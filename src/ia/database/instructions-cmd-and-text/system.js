import { Type } from "@google/genai";

export const DEFAULT_JSON_IA_CONFIG = {
    responseMimeType: 'application/json',
    responseSchema: {
        type: Type.OBJECT,
        required: ["message", "isCmd", "command", "hasParam", "params"],
        properties: {
            message: {
                type: Type.STRING,
                description: 'Mensagem resultado ou Comando se for cmd'
            },
            isCmd: {
                type: Type.BOOLEAN,
                description: 'True se for comando ou False se for apenas uma conversa normal'
            },
            command: {
                type: Type.STRING,
                description: 'Comando a ser executado se for cmd'
            },
            hasParam: {
                type: Type.BOOLEAN,
                description: 'Analisa se precisa de parametros junto do comando'
            },
            params: {
                type: Type.STRING,
                description: 'Parametros que o user pediu junto com o contexto do comando'
            }
        },
    },
};