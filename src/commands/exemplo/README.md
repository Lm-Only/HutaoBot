````markdown name=README.md
# 📚 Centro de Documentação - HutaoBot V10.0.0

> **Bem-vindo!** Este é o guia completo para entender e personalizar seu **HutaoBot-MD V10.0.0**. 
> Aqui você encontrará tudo que precisa saber sobre **configurações**, **criação de comandos** e **funcionalidades**.

---

## 📋 Índice Rápido

1. [🚀 Começando](#-começando)
2. [⚙️ Configurações Principais](#️-configurações-principais)
3. [🎮 Modos de Funcionamento](#-modos-de-funcionamento)
4. [📝 Criando Seus Próprios Comandos](#-criando-seus-próprios-comandos)
5. [🤖 Sistema de IA](#-sistema-de-ia)
6. [💬 Auto Resposta Personalizada](#-auto-resposta-personalizada)
7. [🎨 Personalizações Visuais](#-personalizações-visuais)
8. [❌ Erros Comuns e Soluções](#-erros-comuns-e-soluções)

---

## 🚀 Começando

### Instalação e Primeira Inicialização

Se você já instalou o bot e está com dúvidas sobre como começar, consulte:

- **Hospedagem**: Veja o [README principal](../../README.md#iniciar-por-hospedagem-) para instruções de hospedagem
- **Termux (Android)**: Veja o [README principal](../../README.md#iniciar-pelo-termux-) para Termux
- **Primeiro Acesso**: Você precisará de uma **chave de acesso** (adquirida mediante pagamento)

### Estrutura de Pastas

```
src/
├── commands/          # Seus comandos personalizados
│   ├── exemplo/       # Comandos de exemplo
│   ├── adms/          # Comandos para administradores
│   ├── donos/         # Comandos apenas para donos
│   ├── membros/       # Comandos para membros
│   └── global/        # Comandos globais
├── ia/               # Sistema de Inteligência Artificial
│   └── database/     # Base de dados da IA
├── messages/         # Mensagens e respostas automáticas
├── defaults/         # Configurações padrão
└── utils/            # Funções utilitárias
```

---

## ⚙️ Configurações Principais

### Arquivo: `src/commands/settings.js`

Este é o arquivo **central de configurações** do seu bot. Aqui você pode ajustar:

#### 📌 Debug Mode
```javascript
export const options = {
    debugMode: true,      // true = mostra logs | false = desativa
    debugErrors: true,    // true = printa erros no console
    debugProcess: true    // true = mostra processos realizados
};
```

#### 🚫 Comandos Perigosos
```javascript
export const NO_PREFIX_DANGEROUS_COMMANDS = [
    'nuke',           // Comando para deletar grupo
    'sair',          // Bot sai do grupo
    'suicidio',      // Comando suspeito
    'hutao',         // Nome da IA
    // Adicione mais comandos que deseja bloquear
];
```

#### 🎤 Comando de Perfil
```javascript
export const COMANDO_PERFIL = {
    enviarAudio: true,    // true = envia áudio ao acessar perfil
    reaction: {
        active: true,     // true = bot reage à mensagem
        emoji: '💖'       // Emoji da reação
    }
};
```

### Arquivo: `src/ia/settings.js`

Configurações específicas da **Inteligência Artificial**:

```javascript
export const DEFAULT_IA_CONFIG = {
    name: 'HutaoBot-MD',        // Nome que a IA usa para se apresentar
    prefixName: 'hutao'         // Prefixo para chamar a IA (sempre em minúsculo)
};
```

**Como usar**: Digite `hutao me ajude` ou `hutao <pedido>` para ativar a IA.

---

## 🎮 Modos de Funcionamento

### Modo Gamer 🎮

O **Modo Gamer** permite comandos divertidos e interativos em grupos:

#### Ativar/Desativar
- **Comando**: `gamertrue` (liga) | `gamerfalse` (desliga)
- **Requisito**: Apenas administradores podem usar
- **Descrição**: Ativa funções como rank gay, comer, entre outros

#### Comandos Disponíveis (Modo Gamer)

| Comando | Uso | Descrição |
|---------|-----|-----------|
| `rankgay` | `rankgay` | Mostra ranking dos "mais gays" do grupo |
| `comer` | `comer @usuario` | Ação divertida com menção a usuário |
| `transar` | `transar @usuario` | Ação divertida com menção a usuário |

### Modo RPG 🗡️

Sistema de RPG com durabilidade de ferramentas e progressão de personagem.

**Status**: Ainda em desenvolvimento. Verifique `src/commands/` para mais detalhes.

---

## 📝 Criando Seus Próprios Comandos

### ✅ O Que Você Precisa

Para criar um comando, você **precisa** de:

1. **Arquivo JavaScript** em uma pasta dentro de `src/commands/`
2. **Importar** `{ hutao }` do `../system.js`
3. **Usar** `hutao.setCommand({ ... })`
4. **Definir** `commands`, `execute` e opcionalmente `name` e `description`

### 🔧 Estrutura Básica

```javascript
import { hutao } from "../system.js";

hutao.setCommand({
    name: 'Nome do Comando',                    // Opcional, mas recomendado
    description: 'O que este comando faz',      // Opcional, mas recomendado
    commands: ['seu-comando', 'alias1'],        // Obrigatório - array de gatilhos

    execute: async ({
        reply,           // Enviar mensagem de texto
        react,           // Reagir com emoji
        from,            // ID do grupo/chat
        sender,          // ID de quem enviou
        pushname,        // Nick de quem enviou
        isGroup,         // true = grupo | false = privado
        isAdm,           // true = é admin do grupo
        isDono,          // true = é dono do bot
        isDonos,         // true = é líder
        isBot,           // true = mensagem é do bot
        body,            // Mensagem original
        budy,            // Mensagem em minúsculo
        q,               // Argumentos após o comando
        command,         // Comando executado
        quoted,          // Mensagem citada
        groupMetadata,   // Dados do grupo
        isModoGamer,     // true = modo gamer ativo
        mention,         // Menção (@usuario)
    }) => {
        
        // Sua lógica aqui
        reply('Olá! Este é meu comando personalizado!');
    }
});
```

### 📚 Exemplos Prontos

#### ✨ Exemplo 1: Comando Simples

```javascript
import { hutao } from "../system.js";

hutao.setCommand({
    name: 'Olá',
    commands: ['oi', 'ola'],
    
    execute: async ({ reply, pushname }) => {
        reply(`Oi ${pushname}! Como vai? 😊`);
    }
});
```

#### 🖼️ Exemplo 2: Enviando Imagem

```javascript
import { hutao } from "../system.js";
import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

hutao.setCommand({
    name: 'Foto',
    commands: ['foto', 'imagem'],
    
    execute: async ({ from, reply }) => {
        try {
            await hutao.sendImage(from, IMAGENS.imgmenu, 'Aqui está a imagem! 📸');
        } catch (error) {
            reply('❌ Erro ao enviar imagem');
        }
    }
});
```

#### 🎯 Exemplo 3: Apenas para Admins

```javascript
import { hutao } from "../system.js";
import txt from '../../messages/messages.js';

hutao.setCommand({
    name: 'Admin Only',
    commands: ['admintest'],
    
    execute: async ({ isAdm, reply }) => {
        if (!isAdm) return reply(txt.admin_only);
        
        reply('✅ Você é um administrador!');
    }
});
```

#### 👥 Exemplo 4: Apenas em Grupos

```javascript
import { hutao } from "../system.js";
import txt from '../../messages/messages.js';

hutao.setCommand({
    name: 'Group Only',
    commands: ['grouptest'],
    
    execute: async ({ isGroup, reply }) => {
        if (!isGroup) return reply(txt.only_group);
        
        reply('✅ Este comando só funciona em grupos!');
    }
});
```

#### 🔔 Exemplo 5: Com Reação e Delay

```javascript
import { hutao } from "../system.js";
import { delay } from "baileys";

hutao.setCommand({
    name: 'Reação',
    commands: ['react-test'],
    
    execute: async ({ reply, react }) => {
        react('⏳');          // Mostra "digitando"
        await delay(2000);   // Aguarda 2 segundos
        react('✅');         // Mostra "concluído"
        
        reply('Comando executado com sucesso!');
    }
});
```

### 📂 Onde Salvar Meu Comando?

Salve na pasta correspondente:

- **`src/commands/adms/`** → Comandos apenas para admins
- **`src/commands/donos/`** → Comandos apenas para donos
- **`src/commands/membros/`** → Comandos para membros
- **`src/commands/global/`** → Comandos para qualquer pessoa
- **`src/commands/exemplo/`** → Seus primeiros testes

> 💡 **Dica**: O bot **detecta automaticamente** todos os arquivos `.js` nessas pastas!

---

## 🤖 Sistema de IA

### 🧠 Como a IA Funciona

O HutaoBot possui um **sistema de IA integrado** que usa **Google Generative AI**. A IA:

1. **Entende contexto** de mensagens dos usuários
2. **Distingue comandos de conversas normais**
3. **Executa comandos memorizados**
4. **Responde de forma natural**

### 📚 Onde Está Configurada

- **Arquivo principal**: `src/ia/generativeIA.js`
- **Settings**: `src/ia/settings.js`
- **Base de dados**: `src/ia/database/`

### 🎓 Banco de Dados da IA

#### Arquivo: `src/ia/database/instructions-cmd/commands.js`

Aqui ficam os **comandos que a IA pode executar**:

```javascript
const COMMANDS_IA = [
    {
        contexto: 'Envie o menu',                      // O que o usuário diz
        comando: 'menu'                                // Comando que será executado
    },
    {
        contexto: 'Abrir grupo às 10:00 am',
        comando: 'opengp 10:00'                        // Comando com parâmetros
    },
    {
        contexto: 'Tocar música: Play Date',
        command: 'play Play Date'
    }
];
```

#### ➕ Adicionando Novo Comando para a IA

1. Abra `src/ia/database/instructions-cmd/commands.js`
2. Adicione um novo objeto ao array `COMMANDS_IA`:

```javascript
{
    contexto: 'Descrição do que o usuário vai dizer',
    comando: 'comando-que-sera-executado'
}
```

3. **Exemplo prático**:

```javascript
{
    contexto: 'Mostrar informações do bot',
    comando: 'info'
}
```

Agora quando o usuário disser "Mostrar informações do bot", a IA executará o comando `info`.

### 📋 Sistema Duplo: Comando + Conversa

O bot consegue diferenciar:

- **Comandos**: `"Toca uma música"` → Executa `play`
- **Conversa**: `"Como você está?"` → Responde conversando

**Arquivo de configuração**: `src/ia/database/instructions-cmd-and-text/instructions.txt`

---

## 💬 Auto Resposta Personalizada

### 🎯 O Que É?

**Auto Resposta** permite que o bot **responda automaticamente** quando certas palavras são mencionadas.

### 📄 Arquivo de Configuração

**Caminho**: `src/messages/autoresposta.js`

### ⚙️ Como Funciona

```javascript
export default [
    {
        contenha: ["bot"],           // Se a mensagem CONTÉM essas palavras
        enviar: [
            {
                tipo: "react",       // Tipo de resposta: react, message, audio, sticker
                text: "💝"           // Conteúdo da resposta
            },
            {
                tipo: "message",
                text: "'-'"
            }
        ]
    }
];
```

### 📝 Tipos de Resposta

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `react` | Reagir com emoji | `{ tipo: "react", text: "❤️" }` |
| `message` | Enviar mensagem de texto | `{ tipo: "message", text: "Oi!" }` |
| `audio` | Enviar áudio | `{ tipo: "audio", caminho: "./arquivo.mp3" }` |
| `sticker` | Enviar sticker/figurinha | `{ tipo: "sticker", caminho: "url_ou_arquivo" }` |

### ➕ Adicionando Sua Própria Auto Resposta

1. Abra `src/messages/autoresposta.js`
2. Adicione um novo objeto ao array `export default`:

```javascript
{
    contenha: ["sua", "palavra"],    // Palavras-chave em MINÚSCULAS e SEM ACENTUAÇÃO
    enviar: [
        {
            tipo: "react",
            text: "😊"
        },
        {
            tipo: "message",
            text: "Olá! Você mencionou minha palavra!"
        }
    ]
}
```

### 📌 Regras Importantes

⚠️ **LEIA COM ATENÇÃO**:

- ✅ Palavras-chave **DEVEM ser em minúsculas**
- ✅ **SEM ACENTUAÇÃO** (`café` → `cafe`)
- ✅ Use array para múltiplas palavras: `["palavra1", "palavra2"]`
- ✅ Suporta **URLs** para áudios e stickers

### 💡 Exemplo Completo

```javascript
{
    contenha: ["ola", "oi", "e ai"],    // Três formas diferentes de cumprimento
    enviar: [
        {
            tipo: "react",
            text: "👋"
        },
        {
            tipo: "message",
            text: "Oi! Como posso ajudá-lo(a)?"
        },
        {
            tipo: "audio",
            caminho: "./assets/media/audios/bomdia.mp3"
        }
    ]
}
```

---

## 🎨 Personalizações Visuais

### 🎭 Temas e Mensagens

#### Arquivo: `src/messages/messages.js`

Aqui estão as mensagens **padrão do bot**. Você pode customizar:

- Mensagens de erro
- Respostas a comandos
- Mensagens de espera

#### Arquivo: `src/messages/system.js`

Mensagens de **sistema do bot**:

- Conexão estabelecida
- Erros de conexão
- Modo de conexão (QR ou código)

### 🖼️ Imagens e Mídia

#### Onde Adicionar?

```
assets/
├── media/
│   ├── images/
│   │   ├── imglinks.json      # URLs de imagens
│   │   └── logo.json          # Logos e branding
│   └── audios/
│       ├── bomdia.mp3
│       ├── aids.mp3
│       └── ... outros áudios
```

#### Usando Imagens em Seus Comandos

```javascript
import IMAGENS from '../../../assets/media/images/imglinks.json' with { type: 'json' };

// Enviar imagem
await hutao.sendImage(from, IMAGENS.imgmenu, 'Legenda aqui', quoted);

// Enviar vídeo
await hutao.sendVideo(from, IMAGENS.imgmenu, 'Legenda aqui', quoted);
```

---

## ❌ Erros Comuns e Soluções

### 🔴 Erro: "Comando não está funcionando"

**Causas possíveis**:

1. ❌ Nome do arquivo com espaço: `meu comando.js`
   - ✅ Solução: Renomeie para `meu-comando.js`

2. ❌ Falta importar `hutao` do `../system.js`
   - ✅ Solução: Adicione no início do arquivo:
   ```javascript
   import { hutao } from "../system.js";
   ```

3. ❌ Array `commands` vazio: `commands: []`
   - ✅ Solução: Adicione gatilhos: `commands: ['seu-comando']`

4. ❌ Função `execute` não é `async`
   - ✅ Solução: Use `async function` ou `async () => {}`

### 🟡 Erro: "Cannot find module"

**Causas possíveis**:

1. ❌ Caminho incorreto no import
   - ✅ Solução: Use `../` para subir uma pasta

2. ❌ Falta `.js` no final do arquivo
   - ✅ Solução: Use `/arquivo.js` em imports

### 🔵 Comando Não Responde em Grupo

**Causas possíveis**:

1. ❌ Verificação de `isGroup` bloqueando
   ```javascript
   if (!isGroup) return reply(txt.only_group);  // Bloqueia privado
   ```
   - ✅ Solução: Remova essa linha ou inverta a lógica

2. ❌ Requer `isAdm` mas você não é admin
   - ✅ Solução: Peça para alguém admin executar

### 🟢 Auto Resposta Não Funciona

**Causas possíveis**:

1. ❌ Palavra com acentuação: `café` em vez de `cafe`
   - ✅ Solução: Remove acentuação

2. ❌ Palavras em MAIÚSCULAS
   - ✅ Solução: Use **sempre minúsculas**

3. ❌ Caminho do arquivo de áudio incorreto
   - ✅ Solução: Use URL completa ou caminho relativo correto

---

## 📖 Referência Rápida de Parâmetros

### Dentro de `execute: async ({ ... })`

```javascript
// TEXTOS
body              // Mensagem original exatamente como foi escrita
budy              // Mensagem em minúsculas
q                 // Argumentos após o comando

// PESSOAS
sender            // ID de quem enviou (número@s.whatsapp.net)
pushname          // Nick de quem enviou a mensagem
mention           // Menção formatada (@usuario)

// GRUPO
from              // ID do grupo ou chat individual
isGroup           // true = grupo | false = privado
groupName         // Nome do grupo
groupMembers      // Array com IDs de membros
groupMetadata     // Dados completos do grupo (Baileys)

// PERMISSÕES
isAdm             // true = é admin do grupo
isDono           // true = é dono oficial do bot
isDonos          // true = é líder/dono secundário
isBot            // true = mensagem é do bot

// FUNÇÕES
reply()           // Enviar mensagem de texto
react()           // Reagir com emoji
quoted            // Mensagem citada (Object)

// MODOS
isModoGamer       // true = modo gamer ativo
isModoRpg        // true = modo RPG ativo

// COMANDO
command           // Nome do comando executado
info              // Objeto completo da mensagem (Baileys)
contentType       // Tipo de conteúdo (text, image, etc)
isMedia           // true = é mídia (imagem, vídeo, etc)
```

---

## 🔗 Links Úteis

- 📖 [README Principal do Projeto](../../README.md)
- 🎬 [Tutorial Instalação](https://youtu.be/UEayN52fsco)
- 🎬 [Tutorial Atualização](https://youtu.be/7B5EkX5PFFk)
- 🎬 [Tutorial API Yuta](https://www.youtube.com/watch?v=RiWTirsWTeg)
- 💬 [WhatsApp Suporte](https://wa.me/559284828701?text=Preciso%20de%20ajuda%20com%20HutaoBot)
- 📺 [Canal YouTube](https://youtube.com/@hutaobotoficial)

---

## ✉️ Suporte e Dúvidas

**Encontrou um problema?**

1. Verifique a seção [❌ Erros Comuns](#-erros-comuns-e-soluções)
2. Releia o tutorial relacionado
3. Fale conosco: [WhatsApp Suporte](https://wa.me/559284828701?text=Preciso%20de%20ajuda%20com%20HutaoBot)

**Quer aprender mais?**

- Veja exemplos reais em `src/commands/membros/`
- Estude o arquivo `src/commands/exemplo/exemplo.js`
- Consulte a seção [📝 Criando Seus Próprios Comandos](#-criando-seus-próprios-comandos)

---

**© 2024 HutaoBot-MD V10.0.0** | **Desenvolvido por Lm Only** ✨

> ⚠️ Lembre-se: Use o bot moderadamente e evite compartilhar o projeto.
````
