import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { createInterface } from 'node:readline';

// Permite checar resolução de pacotes CommonJS/ESM via require.resolve
const require = createRequire(import.meta.url);

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomElement = (arr) => arr?.length ? arr[Math.floor(Math.random() * arr.length)] : '';

// Formatadores de cores ANSI para o console
const colors = {
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

const typing = async (text, speed = 10) => {
    for (const char of text) {
        process.stdout.write(char);
        await delay(speed);
    }
};

const arrayPossibilities = [
    {
        title: "Testar o contador de mensagens.",
        type: 0,
        execute: async () => {
            await delay(800);
            const filePath = "./assets/groups/countmsg.json";
            console.log(`\nAnalisando arquivo: ${colors.gray("countmsg.json")} em ./assets/groups/`);
            
            if (existsSync(filePath)) {
                JSON.parse(readFileSync(filePath, 'utf-8'));
            } else {
                writeFileSync(filePath, "{}");
            }
        },
        executeOnError: async () => {
            await delay(500);
            try {
                writeFileSync("./assets/groups/countmsg.json", "{}");
                console.log(colors.green("\nArquivo de contagem corrigido e restaurado com sucesso! ✅"));
            } catch (err) {
                console.error(colors.red("\n⚠️ Ocorreu um erro ao tentar restaurar o arquivo de contagem!"));
            }
        }
    },
    {
        title: "Verificar e limpar JSONs corrompidos de ativação.",
        type: 1,
        execute: async () => {
            await delay(800);
            const dirPath = "./assets/groups/activation";
            console.log(`\nEscaneando diretório: ${colors.gray(dirPath)}`);

            if (!existsSync(dirPath)) {
                console.log(colors.yellow("Diretório de ativação não encontrado. Ignorando..."));
                return;
            }

            const files = readdirSync(dirPath).filter(file => file.endsWith('.json'));
            let corruptedCount = 0;

            for (const file of files) {
                const fullPath = join(dirPath, file);
                try {
                    const content = readFileSync(fullPath, 'utf-8');
                    JSON.parse(content); // Teste de integridade do JSON
                } catch {
                    // Se falhar no parse, apaga o arquivo imediatamente
                    unlinkSync(fullPath);
                    corruptedCount++;
                    console.log(colors.red(` 🗑️ Removido arquivo corrompido: ${file}`));
                }
            }

            if (corruptedCount > 0) {
                console.log(colors.yellow(`\n⚠️ Limpeza concluída: ${corruptedCount} arquivo(s) corrompido(s) removido(s).`));
            } else {
                console.log(colors.green("Todos os JSONs do diretório de ativação estão íntegros! ✅"));
            }
        },
        executeOnError: async () => {}
    },
    {
        title: "Testar módulos do package.json",
        type: 2,
        execute: async () => {
            await delay(800);
            if (!existsSync("./package.json")) {
                console.log(colors.red("Arquivo package.json não encontrado."));
                return;
            }

            const pkg = JSON.parse(readFileSync("./package.json", 'utf-8'));
            const dependencies = pkg.dependencies;

            if (!dependencies) {
                console.log("O package.json não possui dependências declaradas.");
                return;
            }

            const missingModules = [];
            for (const mod of Object.keys(dependencies)) {
                try {
                    require.resolve(mod);
                } catch {
                    missingModules.push(mod);
                }
            }

            if (missingModules.length > 0) {
                console.error(colors.red(`\n⚠️ Módulos não encontrados: ${missingModules.join(", ")}`));
                console.log("\nInstruções de instalação:");
                console.log(`1️⃣ - Execute no terminal: ${colors.gray("npm install " + missingModules.join(" "))}`);
                console.log(`2️⃣ - Em hospedagens, ative a opção: ${colors.gray("Instalar módulos")}`);
                throw new Error("Módulos ausentes");
            } else {
                console.log(colors.green("Todos os módulos do package.json estão instalados corretamente! ✅"));
            }
        },
        executeOnError: async () => {}
    }
];

const MESSAGES_IA = [
    {
        messagesStart: [
            "Irei verificar o arquivo do contador de mensagens para ver se está tudo certo.",
            "Primeiro vamos checar o arquivo do contador de mensagens."
        ],
        messagesEnd: [
            "O arquivo do contador de mensagens está funcionando perfeitamente.",
            "O arquivo do contador de mensagens está OK!"
        ],
        messagesError: [
            "O arquivo do contador de mensagens está corrompido, irei corrigir isso para você."
        ]
    },
    {
        messagesStart: [
            "Iniciando varredura nos arquivos de ativação dos grupos...",
            "Checando a integridade de todos os JSONs em ./assets/groups/activation/..."
        ],
        messagesEnd: [
            "Varredura nos grupos concluída com sucesso.",
            "Integridade dos grupos checada com sucesso."
        ],
        messagesError: [
            "Houve uma falha ao tentar analisar os arquivos do diretório de ativação."
        ]
    },
    {
        messagesStart: [
            "Agora irei verificar os módulos do package.json...",
            "Validando a presença das dependências do sistema..."
        ],
        messagesEnd: [
            "Todos os módulos estão instalados e prontos."
        ],
        messagesError: [
            "Módulos pendentes identificados no sistema."
        ]
    }
];

const runDiagnostics = async () => {
    console.clear();
    console.log(`\nSistema criado por: ${colors.gray("L.M. Only")}`);
    console.log(`Contato: ${colors.gray("wa.me/559284828701")}\n\n`);

    await typing("Olá! Seja bem-vindo ao sistema de diagnóstico da HutaoBot-MD 🙇🏻‍♀️");
    await delay(600);
    await typing("\nIrei realizar os testes operacionais no sistema... 😉");
    await delay(600);
    await typing("\n\nIniciando bateria de testes 👩🏻‍🔧");
    await delay(1000);

    for (const item of arrayPossibilities) {
        const msgSet = MESSAGES_IA[item.type];
        try {
            await typing("\n\n" + getRandomElement(msgSet.messagesStart));
            await item.execute();
            await delay(800);
            if (msgSet.messagesEnd[0]) {
                await typing("\n" + getRandomElement(msgSet.messagesEnd));
            }
        } catch (err) {
            await delay(800);
            await typing("\n\n" + getRandomElement(msgSet.messagesError));
            await item.executeOnError();
        }
    }

    await typing("\n\nTodos os diagnósticos foram concluídos! Se precisar de suporte, entre em contato. 🙇🏻‍♀️\n\n");
    console.log(`Desenvolvido por: ${colors.gray("L.M. Only")}`);
    console.log(`Suporte: ${colors.gray("wa.me/559284828701")}\n`);
    rl.close();
};

runDiagnostics();