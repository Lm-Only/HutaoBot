import { RouteNames } from "yutaapis";
import { AnyMessageContent, MiscMessageGenerationOptions, WAMessage } from "baileys";

declare global {
    interface CommandExecuteParams {
        reply: (message: string | object) => any;
        react: (emoji: string) => void;
        getGroupData: (id: string) => Promise<Record<string, any>>;
        setGroup: (data: Array<any>, path?: string) => Promise<any>;
        info: Record<string, any>;
        quoted?: Record<string, any>;
        groupMetadata?: Record<string, any>;
        dataGroup?: Array<Record<string, any>>;
        api?: RouteNames;
        mention?: Record<string, any> | string;
        mention_prt?: Record<string, any> | string;
        mention_jid?: string[] | Record<string, any>;
        groupMembers?: Record<string, any>[] | Record<string, any>;
        groupAdmins?: string[] | Record<string, any>;
        from: string;
        sender: string;
        botNumber: string;
        command: string;
        prefixo: string;
        groupName?: string;
        pushname?: string;
        body?: string;
        budy?: string;
        q?: string;
        contentType?: string;
        isAdm?: boolean;
        isDono?: boolean;
        isDonos?: boolean;
        isBot?: boolean;
        isGroup?: boolean;
        isMedia?: boolean;
        isModoGamer?: boolean;
        isModoRpg?: boolean;
        isModoAluguel?: boolean;
        isPremium?: boolean;
    }

    interface CommandRegisterParams {
        /**
         * Nome apenas como referencia do comando
         * Não é obrigatorio
         */
        name?: string;
        /**
         * Descrição resumida de como o comando funciona
         */
        description?: string;
        /**
         * Array de comandos
         * Sempre verifique se o nome já existe em outro lugar
         * 
         * - é obrigatorio definir esse parametro
         */
        commands: string[];
        /**
         * Aqui é onde a magica acontece
         * Tudo que tiver dentro de execute vai ser executado
         * É recomendavel o tratamento de erros para que o script não quebre
         * 
         * @param params Parametros disponiveis do bot
         * @returns void
         */
        execute: (params: CommandExecuteParams) => Promise<void>;
    }


    interface ParamsRegister {
        sendImage: (from: string, data?: string | ArrayBuffer, quoted?: any) => Promise<void>;
        sendVideo: (from: string, data?: string | ArrayBuffer, quoted?: any) => Promise<void>;
        getPerfil: (user: string, defaultImage?: string) => Promise<string>;

        sendMessage: (jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions) => Promise<WAMessage | undefined>;
        setCommand: (params: CommandRegisterParams) => void;

    }

}

export {};