# Yuta APIs
Módulo SDK TypeScript/JavaScript desenvolvido para facilitar a integração e o uso do [Yuta APIs](https://yuta-apis.xyz) em projetos de forma mais simples e profissional.

<h1 align="center">
<p>
    <img src="https://raw.githubusercontent.com/Lm-Only/yutaapis/refs/heads/main/assets/banner.jpg" alt="Yuta APIS" width="720">
</p>
  
##

<details>
    <summary>
        <b>Créditos...</b>
    </summary>

## Desenvolvedor 🧑‍💻
<div align="center">
  <table>
    <tr>
      <td align="right" valign="middle" style="padding-right: 15px;">
        <img src="https://github.com/Lm-Only.png?size=120" width="120" height="120" style="border: 3px solid #8A2BE2; border-radius: 50%;">
      </td>
      <td align="left" valign="middle">
        <h2 style="margin: 0; font-family: monospace; color: #8A2BE2;">
          Lm Only
        </h2>
        <p style="margin: 5px 0; color: #cfcfcf; font-family: monospace; font-size: 14px;">
  Criador do módulo
        </p>
        <p style="margin: 8px 0 0 0;">
           <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="Typescript"/>
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
          <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
          <img src="https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white" alt="Fastify" />
          <img src="https://img.shields.io/badge/Bash-4EAA25?style=flat-square&logo=gnu-bash&logoColor=white" alt="Shell" />
        </p>
      </td>
    </tr>
  </table>
</div>

## Criador do Yuta APIs 👑
<div align="center">
  <table>
    <tr>
      <td align="right" valign="middle" style="padding-right: 15px;">
        <img src="https://github.com/Nk-Petrov.png?size=120" width="120" height="120" style="border: 3px solid #8A2BE2; border-radius: 50%;">
      </td>
      <td align="left" valign="middle">
        <h2 style="margin: 0; font-family: monospace; color: #8A2BE2;">
          Lm Only
        </h2>
        <p style="margin: 5px 0; color: #cfcfcf; font-family: monospace; font-size: 14px;">
            Criador da API
        </p>
        <p style="margin: 8px 0 0 0;">
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
          <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
            <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
        </p>
      </td>
    </tr>
  </table>
</div>
    
</details>

> [!IMPORTANT]
> **Algumas rotas podem estar em falta, pelo motivo de não estarem funcionando. As rotas registradas estão funcionando perfeitamente e prontas pra uso**

## Instalação

```bash
npm i yutaapis
```

* Se não funcionar, execute:
```bash
npm i yutaapis --no-bin-links --omit=dev
```

## Quickstart

* ESM
```javascript
// Esm - "type": "module"
import YutaApis from 'yutaapis';
```
> Se seu projeto for do tipo ESM
---

* CJS
```javascript
const { default: YutaApis } = require('yutaapis');
```
> Ou se for do tipo padrão (maioria)
---

## Usage
```javascript
const api = new YutaApis({
  apiToken: process.env.TOKEN // token do Yuta obtido no site
});

const gitstalkResult = await api.pesquisas.gitstalk('Lm-Only'); // Promise<Object>

if (!gitstalkResult.status) {
    console.error(gitstalkResult.msg || 'Error na API');
    process.exit();
}

console.log(gitstalkResult);
```

##

> [!NOTE]
> Afinal de contas, **Para que este módulo serve? 🤔**

<details>

<summary>
     <b>Saiba aqui...👇</b>
 </summary>

* Este módulo foi desenvolvido inteiramente em Typescript por **Lm Only** projetada para facilitar a integração e o uso do [Yuta APIs](https://yuta-apis.xyz) em projetos de forma mais simples e profissional.. ✨️

* Uma das **principais características** desse módulo, é a forma de como ele é usado, principalmente para quem programa usando o **VScode.** 🧑‍💻 Essa característica ajuda ao dev a **entender** o que tal rota recebe e o que ela retorna. 💎

* Além disso, o módulo evita que a mesma coisa se **repita várias vezes.** Veja o Exemplo:

## Antes 
```javascript
// Veja o código todo deslizando pra direita
const url = "https://yuta-apis.xyz/api/geradores/gerar-nicks?text=Lm+Only&apitoken=SEU_TOKEN";
const response = await fetch(url);
const contentType = response.headers.get("content-type") || "";
const result = contentType.includes("json")
  ? await response.json()
  : await response.blob();

console.log(result);
```
## Depois 👇
```javascript
const nicks = await api.geradores.nick('Lm Only');
console.log(nicks);
```

## Resumo - Script 1° 🥰

* A primeira opção deixava o código **poluído** e **difícil de entender**. 💔
* E se pararmos para analisar, essa rota era apenas um simples **gerador de nick** 🙌
* Logicamente você vai ter que passar as mesmas coisas toda vez que usar alguma rota nova. 🙏🏼 (tipo, link do site + nome da rota + endpoint) 😶‍🌫️
* Imagine com rotas que **requerem** mais coisas, isso iria causar um **problema visual** KKKKKKKK 😹

## Resumo - Script 2° 🤩
* **Com base no segundo Script, o foco é facilitar a vida do usuário e a legibilidade do código. 💝**
> **Legibilidade se trata daquilo que é legível, algo que é fácil de ser entendido**

## Finalizando 💖
* O módulo tem um **sistema inteligente** que sabe quando der erro; retornar JSON (isso se no caso deveria retornar uma mídia)
* Também ele detecta se tal rota tem **variações**, para evitar acesso inválido.
* Por fim, peço que use um editor de código profissional para o uso do módulo. (VScode por exemplo)

</details>

# Sumário 

- [Api](https://yuta-apis.xyz)
  - [planos](https://yuta-apis.xyz/planos)
  - [login](https://yuta-apis.xyz/login)

- [Exemplos](https://github.com/Lm-Only/yutaapis/tree/main/examples)
  - [Scripts](https://github.com/Lm-Only/yutaapis/blob/main/examples/example.js)

- [Pesquisas](#pesquisas)
  - [wiki](#wiki)
  - [ytsearch](#ytsearch)
  - [gitstalk](#gitstalk)
  - [filmesSearch](#filmessearch)
  - [lyrics_search](#lyrics_search)
  - [pensador](#pensador)
  - [playstore](#playstore)
  - [wallpaper](#wallpaper)
  - [google](#google)

- [Downloads](#downloads)
  - [ytmp3](#ytmp3)
  - [ytmp4](#ytmp4)
  - [play](#play)
  - [playvideo](#playvideo)
  - [tiktokdl](#tiktokdl)
  - [tiktokMp3](#tiktokmp3)
  - [tiktokMp4](#tiktokmp4)
  - [instavideo](#instavideo)
  - [facebook](#facebook)
  - [facebookMp3](#facebookmp3)
  - [facebookMp4](#facebookmp4)
  - [pinterest](#pinterest)
  - [pinterestMp3](#pinterestmp3)
  - [pinterestMp4](#pinterestmp4)
  - [pinterestVideo](#pinterestvideo)
  - [tiktok_foto](#tiktok_foto)
  - [mediafire](#mediafire)
  - [spotifyMp3](#spotifymp3)
  - [spotifyPlay](#spotifyplay)

- [IAs](#ias)
  - [gpt](#gpt)
  - [gemini_pro](#gemini_pro)
  - [perplexity_ai](#perplexity_ai)
  - [geminivoz](#geminivoz)
  - [gemini](#gemini)

- [Geradores](#geradores)
  - [nick](#nick)
  - [qrcode](#qrcode)

- [Animes](#animes)
  - [hentai_video](#hentai_video)
  - [hentai_video2](#hentai_video2)
  - [metadinha](#metadinha)
  - [quotesanimes](#quotesanimes)

- [Logos](#logos)
  - [logos](#logos-logos)

- [Notícias](#notícias)
  - [cnn](#cnn)
  - [esportes](#esportes)
  - [g1](#g1)
  - [ibge](#ibge)
  - [noticias_atuais](#noticias_atuais)
  - [politica](#politica)
  - [uol](#uol)

- [Plaquinhas](#plaquinhas)
  - [plaquinhas](#plaq)

- [Stickers](#stickers)
  - [attp](#attp)
  - [brat](#brat)
  - [bratvid](#bratvid)
  - [figu](#figu)
  - [figu_anime](#figu_anime)
  - [figu_coreana](#figu_coreana)
  - [figu_desenho](#figu_desenho)
  - [figu_emoji](#figu_emoji)
  - [figu_engracadas](#figu_engracadas)
  - [figu_raiva](#figu_raiva)
  - [figu_roblox](#figu_roblox)

- [Canvas](#canvas)
  - [welcome](#welcome)
  - [cardMusic](#cardmusic)
  - [bemvindo](#bemvindo)
  - [levelup](#levelup)
  - [ping](#ping)
  - [perfil](#perfil)
  - [goodbye](#goodbye)
  - [ship](#ship)
  - [qc](#qc)
  - [saiu](#saiu)

- [Outros](#outros)
  - [ascii](#ascii)
  - [clima](#clima)
  - [emoji_mix](#emoji_mix)
  - [signo](#signo)
  - [traduzir](#traduzir)
  - [ip](#ip)
  - [encurtarLink](#encurtarlink)
  - [frasesAmor](#frasesamor)
  - [hd](#hd)
  - [hd2](#hd2)
  - [totext](#totext)
  - [textImg](#textimg)
  - [meme](#meme)
  - [buscarLocal](#buscarlocal)
  - [shazam](#shazam)

- [Upload](#upload)
  - [api.upload](#apiupload)

---

## Pesquisas

### wiki
Busca informações/resumo de um termo na Wikipedia.
```javascript
const wiki = await api.pesquisas.wiki('Typescript');
console.log(wiki);
```

### ytsearch
Pesquisa vídeos no YouTube por texto.
```javascript
const ytsearch = await api.pesquisas.ytsearch('Baby Shark');
console.log(ytsearch);
```

### gitstalk
Consulta informações públicas de um usuário GitHub.
```javascript
const gitstalk = await api.pesquisas.gitstalk('Lm-Only');
console.log(gitstalk);
```


### filmesSearch
Pesquisa filmes por título.
```javascript
const filmesSearch = await api.pesquisas.filmesSearch('Interstellar');
console.log(filmesSearch);
```

### lyrics_search
Busca letra de música por nome/artista.
```javascript
const lyricsSearch = await api.pesquisas.lyrics_search('Nuts Lil Peep');
console.log(lyricsSearch);
```

### pensador
Busca frases no Pensador por termo.
```javascript
const pensador = await api.pesquisas.pensador('motivação');
console.log(pensador);
```

### playstore
Pesquisa apps na Play Store por nome.
```javascript
const playstore = await api.pesquisas.playstore('WhatsApp');
console.log(playstore);
```

### wallpaper
Pesquisa wallpapers por texto.
```javascript
const wallpaper = await api.pesquisas.wallpaper('HuTao');
console.log(wallpaper);
```

### google
Pesquisa dados gerais no Google.
```javascript
const google = await api.pesquisas.google('Typescript');
console.log(google);
```

---

## Downloads

### ytmp3
Baixa áudio MP3 de um link do YouTube.
```javascript
const ytmp3 = await api.downloads.ytmp3('https://www.youtube.com/watch?v=osPq9Yb8xm8');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const ytmp3 = await api.downloads.ytmp3('https://www.youtube.com/watch?v=osPq9Yb8xm8');
await writeFile('ytmp3.mp3', ytmp3);
```

### ytmp4
Baixa vídeo MP4 de um link do YouTube.
```javascript
const ytmp4 = await api.downloads.ytmp4('https://www.youtube.com/watch?v=osPq9Yb8xm8');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const ytmp4 = await api.downloads.ytmp4('https://www.youtube.com/watch?v=osPq9Yb8xm8');
await writeFile('ytmp4.mp4', ytmp4);
```

### play
Busca uma música por nome e retorna o resultado em áudio.
```javascript
const play = await api.downloads.play('Nuts');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const play = await api.downloads.play('Nuts');
await writeFile('play.mp3', play);
```

### playvideo
Busca um vídeo por nome e retorna o vídeo.
```javascript
const playvideo = await api.downloads.playvideo('Hutao Edit');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const playvideo = await api.downloads.playvideo('Hutao Edit');
await writeFile('playvideo.mp4', playvideo);
```

### tiktokdl
Baixa mídia de um link do TikTok.
```javascript
const tiktokdl = await api.downloads.tiktokdl('https://vt.tiktok.com/ZSqRRu4Dn/');
console.log(tiktokdl);
```


### tiktokMp3
Baixa o áudio MP3 de um link do TikTok.
```javascript
const tiktokMp3 = await api.downloads.tiktokMp3('https://vt.tiktok.com/ZSqRRu4Dn/');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const tiktokMp3 = await api.downloads.tiktokMp3('https://vt.tiktok.com/ZSqRRu4Dn/');
await writeFile('tiktok.mp3', tiktokMp3);
```

### tiktokMp4
Baixa o vídeo MP4 de um link do TikTok.
```javascript
const tiktokMp4 = await api.downloads.tiktokMp4('https://vt.tiktok.com/ZSqRRu4Dn/');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const tiktokMp4 = await api.downloads.tiktokMp4('https://vt.tiktok.com/ZSqRRu4Dn/');
await writeFile('tiktok.mp4', tiktokMp4);
```

### instavideo
Baixa vídeo a partir de link do Instagram.
```javascript
const instavideo = await api.downloads.instavideo('https://www.instagram.com/p/Dc1iG74Fkgt/');
console.log(instavideo);
```


### facebook
Retorna dados de download de vídeo do Facebook.
```javascript
const facebook = await api.downloads.facebook('LINK DO VIDEO');
console.log(facebook);
```

### facebookMp3
Baixa o áudio MP3 de um link do Facebook.
```javascript
const facebookMp3 = await api.downloads.facebookMp3('LINK DO VIDEO');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const facebookMp3 = await api.downloads.facebookMp3('LINK DO VIDEO');
await writeFile('facebook.mp3', facebookMp3);
```

### facebookMp4
Baixa o vídeo MP4 de um link do Facebook.
```javascript
const facebookMp4 = await api.downloads.facebookMp4('LINK DO VIDEO');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const facebookMp4 = await api.downloads.facebookMp4('LINK DO VIDEO');
await writeFile('facebook.mp4', facebookMp4);
```

### pinterest
Pesquisa conteúdo no Pinterest por texto.
```javascript
const pinterest = await api.downloads.pinterest('Hutao Icon');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const pinterest = await api.downloads.pinterest('Hutao Icon');
await writeFile('pinterest.jpg', pinterest);
```

### pinterestMp3
Retorna áudio relacionado a conteúdo do Pinterest (quando suportado).
```javascript
const pinterestMp3 = await api.downloads.pinterestMp3('https://pin.it/5decaQP2P');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const pinterestMp3 = await api.downloads.pinterestMp3('https://pin.it/5decaQP2P');
await writeFile('pinterest.mp3', pinterestMp3);
```


### pinterestMp4
Baixa vídeo MP4 a partir de link do Pinterest.
```javascript
const pinterestMp4 = await api.downloads.pinterestMp4('https://pin.it/5decaQP2P');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const pinterestMp4 = await api.downloads.pinterestMp4('https://pin.it/5decaQP2P');
await writeFile('pinterest.mp4', pinterestMp4);
```

### pinterestVideo
Retorna vídeo a partir de link do Pinterest.
```javascript
const pinterestVideo = await api.downloads.pinterestVideo('https://pin.it/5decaQP2P');
console.log(pinterestVideo);
```


### tiktok_foto
Retorna imagens de um post do TikTok.
```javascript
const tiktokFoto = await api.downloads.tiktok_foto('https://vt.tiktok.com/ZSqRRu4Dn/');
console.log(tiktokFoto);
```

### mediafire
Retorna dados de download de um arquivo do MediaFire.
```javascript
const mediafire = await api.downloads.mediafire('https://www.mediafire.com/file/arquivo_exemplo/file');
console.log(mediafire);
```

### spotifyMp3
Baixa o áudio MP3 de uma faixa do Spotify.
```javascript
const spotifyMp3 = await api.downloads.spotifyMp3('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const spotifyMp3 = await api.downloads.spotifyMp3('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh');
await writeFile('spotify.mp3', spotifyMp3);
```

### spotifyPlay
Pesquisa música no Spotify e retorna metadados.
```javascript
const spotifyPlay = await api.downloads.spotifyPlay('Nuts Lil Peep');
console.log(spotifyPlay);
```

---

## IAs

### gpt
Envia um prompt e retorna resposta gerada por IA (modelo GPT).
```javascript
const gpt = await api.ias.gpt('Oii tudo bem?');
console.log(gpt);
```

### gemini_pro
Envia prompt para modelo Gemini Pro.
```javascript
const geminiPro = await api.ias.gemini_pro('Oii tudo bem?');
console.log(geminiPro);
```

### perplexity_ai
Envia prompt para integração Perplexity AI.
```javascript
const perplexityAi = await api.ias.perplexity_ai('Oii tudo bem?');
console.log(perplexityAi);
```

### geminivoz
Endpoint Gemini com foco em recursos de voz (depende da implementação).
```javascript
const geminiVoz = await api.ias.geminivoz('Oii tudo bem?');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const geminiVoz = await api.ias.geminivoz('Oii tudo bem?');
await writeFile('geminivoz.mp3', geminiVoz);
```

### gemini
Endpoint padrão do Gemini para respostas por prompt.
```javascript
const gemini = await api.ias.gemini('Oii tudo bem?');
console.log(gemini);
```

---

## Geradores

### nick
Gera sugestões de nickname com base no nome informado.
```javascript
const nick = await api.geradores.nick('Lm Only');
console.log(nick);
```

### qrcode
Gera um QR Code com o texto/link enviado.
```javascript
const qrcode = await api.geradores.qrcode('https://github.com/Lm-Only/HutaoBot');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const qrcode = await api.geradores.qrcode('https://github.com/Lm-Only/HutaoBot');
await writeFile('qrcode.png', qrcode);
```


---

## Animes

### hentai_video
Retorna um vídeo hentai aleatório.
```javascript
const hentaiVideo = await api.animes.hentai_video();
console.log(hentaiVideo);
```

### hentai_video2
Retorna outra variação de vídeo hentai aleatório.
```javascript
const hentaiVideo2 = await api.animes.hentai_video2();
console.log(hentaiVideo2);
```

### metadinha
Retorna imagens de metadinha para casal.
```javascript
const metadinha = await api.animes.metadinha();
console.log(metadinha);
```

### quotesanimes
Retorna frases de animes.
```javascript
const quotesanimes = await api.animes.quotesanimes();
console.log(quotesanimes);
```

---

## Logos

### logos
Cria logos com estilo e texto informados.
```javascript
const logos = await api.logos('glitch', 'LmOnly');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const logos = await api.logos('glitch', 'LmOnly');
await writeFile('logo.png', logos);
```

---

## Notícias

### cnn
Retorna notícias da CNN.
```javascript
const cnn = await api.noticias.cnn();
console.log(cnn);
```

### esportes
Retorna notícias da categoria esportes.
```javascript
const esportes = await api.noticias.esportes();
console.log(esportes);
```

### g1
Retorna notícias do G1.
```javascript
const g1 = await api.noticias.g1();
console.log(g1);
```

### ibge
Retorna notícias/conteúdos relacionados ao IBGE.
```javascript
const ibge = await api.noticias.ibge();
console.log(ibge);
```

### noticias_atuais
Retorna notícias gerais atuais.
```javascript
const noticiasAtuais = await api.noticias.noticias_atuais();
console.log(noticiasAtuais);
```

### politica
Retorna notícias de política.
```javascript
const politica = await api.noticias.politica();
console.log(politica);
```

### uol
Retorna notícias da UOL.
```javascript
const uol = await api.noticias.uol();
console.log(uol);
```

---

## Plaquinhas

### plaq
Gera uma plaquinha com modelo (`type`) e texto.
```javascript
const plaquinha = await api.plaquinhas('plaq1', 'LmOnly');
const plaquinha = await api.plaquinhas('plaq10', 'NkPetrov');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const plaquinha = await api.plaquinhas('plaq1', 'LmOnly');
await writeFile('plaquinha.png', plaquinha);
```
> Também vai até plaq10


---

## Stickers

### attp
Gera sticker animada com texto (ATTp).
```javascript
const attp = await api.stickers.attp('Yuta APIs');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const attp = await api.stickers.attp('Yuta APIs');
await writeFile('attp.webp', attp);
```

### brat
Gera sticker estilo brat em imagem.
```javascript
const brat = await api.stickers.brat('Lm Only');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const brat = await api.stickers.brat('Lm Only');
await writeFile('brat.png', brat);
```

### bratvid
Gera sticker estilo brat em vídeo.
```javascript
const bratvid = await api.stickers.bratvid('HutaoBot');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const bratvid = await api.stickers.bratvid('HutaoBot');
await writeFile('bratvid.mp4', bratvid);
```

### figu
Retorna figurinha aleatória.
```javascript
const figu = await api.stickers.figu();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figu = await api.stickers.figu();
await writeFile('figu.webp', figu);
```

### figu_anime
Retorna figurinha de anime aleatória.
```javascript
const figuAnime = await api.stickers.figu_anime();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuAnime = await api.stickers.figu_anime();
await writeFile('figu_anime.webp', figuAnime);
```

### figu_coreana
Retorna figurinha coreana aleatória.
```javascript
const figuCoreana = await api.stickers.figu_coreana();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuCoreana = await api.stickers.figu_coreana();
await writeFile('figu_coreana.webp', figuCoreana);
```

### figu_desenho
Retorna figurinha de desenho aleatória.
```javascript
const figuDesenho = await api.stickers.figu_desenho();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuDesenho = await api.stickers.figu_desenho();
await writeFile('figu_desenho.webp', figuDesenho);
```

### figu_emoji
Retorna figurinha de emoji aleatória.
```javascript
const figuEmoji = await api.stickers.figu_emoji();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuEmoji = await api.stickers.figu_emoji();
await writeFile('figu_emoji.webp', figuEmoji);
```

### figu_engracadas
Retorna figurinha engraçada aleatória.
```javascript
const figuEngracadas = await api.stickers.figu_engracadas();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuEngracadas = await api.stickers.figu_engracadas();
await writeFile('figu_engracadas.webp', figuEngracadas);
```

### figu_raiva
Retorna figurinha de raiva aleatória.
```javascript
const figuRaiva = await api.stickers.figu_raiva();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuRaiva = await api.stickers.figu_raiva();
await writeFile('figu_raiva.webp', figuRaiva);
```

### figu_roblox
Retorna figurinha de Roblox aleatória.
```javascript
const figuRoblox = await api.stickers.figu_roblox();
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const figuRoblox = await api.stickers.figu_roblox();
await writeFile('figu_roblox.webp', figuRoblox);
```

---

## Canvas

### welcome
Gera uma imagem de boas-vindas personalizada.
```javascript
const welcome = await api.canvas.welcome({
  fundo: 'https://i.imgur.com/somebg.jpg',
  text: 'Bem-vindo ao servidor!',
  logo: 'https://i.imgur.com/avatar.png'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const welcome = await api.canvas.welcome({
  fundo: 'https://i.imgur.com/somebg.jpg',
  text: 'Bem-vindo ao servidor!',
  logo: 'https://i.imgur.com/avatar.png'
});
await writeFile('welcome.png', welcome);
```

### cardMusic
Gera card de música com capa e progresso.
```javascript
const cardMusic = await api.canvas.cardMusic({
  fundo: 'https://i.imgur.com/somebg.jpg',
  avatar: 'https://i.imgur.com/cover.png',
  titulo: 'Nuts',
  author: 'Lil Peep',
  atual: '01:10',
  total: '02:25'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const cardMusic = await api.canvas.cardMusic({
  fundo: 'https://i.imgur.com/somebg.jpg',
  avatar: 'https://i.imgur.com/cover.png',
  titulo: 'Nuts',
  author: 'Lil Peep',
  atual: '01:10',
  total: '02:25'
});
await writeFile('cardmusic.png', cardMusic);
```

### bemvindo
Gera imagem de bem-vindo com avatar e campo obrigatório `lengenda` (com **n**), conforme a assinatura da função.
```javascript
const bemvindo = await api.canvas.bemvindo({
  fundo: 'https://i.imgur.com/somebg.jpg',
  perfil: 'https://i.imgur.com/avatar.png',
  lengenda: 'Leia as regras e se divirta!', // atenção: o campo correto é `lengenda`
  titulo: 'Seja bem-vindo'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const bemvindo = await api.canvas.bemvindo({
  fundo: 'https://i.imgur.com/somebg.jpg',
  perfil: 'https://i.imgur.com/avatar.png',
  lengenda: 'Leia as regras e se divirta!', // atenção: o campo correto é `lengenda`
  titulo: 'Seja bem-vindo'
});
await writeFile('bemvindo.png', bemvindo);
```

### levelup
Gera card de subida de nível.
```javascript
const levelup = await api.canvas.levelup({
  fundo: 'https://i.imgur.com/somebg.jpg',
  nome: 'Lm Only',
  logo: 'https://i.imgur.com/avatar.png',
  level: '11',
  oldlevel: '10',
  xp: '1400',
  nextxp: '1500'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const levelup = await api.canvas.levelup({
  fundo: 'https://i.imgur.com/somebg.jpg',
  nome: 'Lm Only',
  logo: 'https://i.imgur.com/avatar.png',
  level: '11',
  oldlevel: '10',
  xp: '1400',
  nextxp: '1500'
});
await writeFile('levelup.png', levelup);
```

### ping
Gera card de status/ping do bot.
```javascript
const ping = await api.canvas.ping({
  fundo: 'https://i.imgur.com/somebg.jpg',
  logo: 'https://i.imgur.com/avatar.png',
  uptime: '2d 04h',
  memoria: '320MB',
  latencia: '89ms',
  status: 'online',
  velocidade: 'ótima'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const ping = await api.canvas.ping({
  fundo: 'https://i.imgur.com/somebg.jpg',
  logo: 'https://i.imgur.com/avatar.png',
  uptime: '2d 04h',
  memoria: '320MB',
  latencia: '89ms',
  status: 'online',
  velocidade: 'ótima'
});
await writeFile('ping.png', ping);
```

### perfil
Gera card de perfil personalizado.
```javascript
const perfil = await api.canvas.perfil({
  fundo: 'https://i.imgur.com/somebg.jpg',
  logo: 'https://i.imgur.com/avatar.png',
  nome: 'Lm Only',
  subnome: 'Desenvolvedor',
  custom_status: 'Codando com Yuta APIs'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const perfil = await api.canvas.perfil({
  fundo: 'https://i.imgur.com/somebg.jpg',
  logo: 'https://i.imgur.com/avatar.png',
  nome: 'Lm Only',
  subnome: 'Desenvolvedor',
  custom_status: 'Codando com Yuta APIs'
});
await writeFile('perfil.png', perfil);
```

### goodbye
Gera imagem de despedida personalizada.
```javascript
const goodbye = await api.canvas.goodbye({
  fundo: 'https://i.imgur.com/somebg.jpg',
  perfil: 'https://i.imgur.com/avatar.png',
  legenda: 'Volte sempre!',
  titulo: 'Até logo'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const goodbye = await api.canvas.goodbye({
  fundo: 'https://i.imgur.com/somebg.jpg',
  perfil: 'https://i.imgur.com/avatar.png',
  legenda: 'Volte sempre!',
  titulo: 'Até logo'
});
await writeFile('goodbye.png', goodbye);
```

### ship
Gera imagem de ship com percentual.
```javascript
const ship = await api.canvas.ship({
  avatar1: 'https://i.imgur.com/avatar1.png',
  avatar2: 'https://i.imgur.com/avatar2.png',
  porcentagem: 88,
  fundo: 'https://i.imgur.com/somebg.jpg'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const ship = await api.canvas.ship({
  avatar1: 'https://i.imgur.com/avatar1.png',
  avatar2: 'https://i.imgur.com/avatar2.png',
  porcentagem: 88,
  fundo: 'https://i.imgur.com/somebg.jpg'
});
await writeFile('ship.png', ship);
```

### qc
Gera quote card com avatar e mensagem.
```javascript
const qc = await api.canvas.qc({
  avatar: 'https://i.imgur.com/avatar.png',
  nick: 'Lm Only',
  message: 'Yuta APIs é bom demais!'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const qc = await api.canvas.qc({
  avatar: 'https://i.imgur.com/avatar.png',
  nick: 'Lm Only',
  message: 'Yuta APIs é bom demais!'
});
await writeFile('qc.png', qc);
```

### saiu
Gera imagem de saída personalizada.
```javascript
const saiu = await api.canvas.saiu({
  fundo: 'https://i.imgur.com/somebg.jpg',
  text: 'Lm Only saiu do grupo',
  logo: 'https://i.imgur.com/avatar.png'
});
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const saiu = await api.canvas.saiu({
  fundo: 'https://i.imgur.com/somebg.jpg',
  text: 'Lm Only saiu do grupo',
  logo: 'https://i.imgur.com/avatar.png'
});
await writeFile('saiu.png', saiu);
```

---

## Outros

### ascii
Converte texto em estilo ASCII art.
```javascript
const ascii = await api.outros.ascii('Lm Only');
console.log(ascii);
```

### clima
Consulta o clima por cidade.
```javascript
const clima = await api.outros.clima('São Paulo');
console.log(clima);
```

### emoji_mix
Mescla dois emojis em uma imagem.
```javascript
const emojiMix = await api.outros.emoji_mix('😎', '🔥');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const emojiMix = await api.outros.emoji_mix('😎', '🔥');
await writeFile('emoji-mix.png', emojiMix);
```

### signo
Retorna informações sobre um signo.
```javascript
const signo = await api.outros.signo('aries');
console.log(signo);
```

### traduzir
Traduz um texto para o idioma informado.
```javascript
const traduzir = await api.outros.traduzir({
  text: 'Olá, mundo!',
  idioma: 'en'
});
console.log(traduzir);
```

### ip
Consulta informações de um endereço IP.
```javascript
const ip = await api.outros.ip('8.8.8.8');
console.log(ip);
```

### encurtarLink
Encurta um link grande.
```javascript
const encurtarLink = await api.outros.encurtarLink('https://github.com/Lm-Only/yutaapis');
console.log(encurtarLink);
```

### frasesAmor
Retorna frases de amor aleatórias.
```javascript
const frasesAmor = await api.outros.frasesAmor();
console.log(frasesAmor);
```

### hd
Melhora a qualidade de uma imagem via URL.
```javascript
const hd = await api.outros.hd('https://i.imgur.com/avatar.png');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const hd = await api.outros.hd('https://i.imgur.com/avatar.png');
await writeFile('hd.png', hd);
```

### hd2
Melhora a qualidade de imagem com variação alternativa.
```javascript
const hd2 = await api.outros.hd2('https://i.imgur.com/avatar.png');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const hd2 = await api.outros.hd2('https://i.imgur.com/avatar.png');
await writeFile('hd2.png', hd2);
```

### totext
Transcreve áudio para texto a partir de URL.
```javascript
const totext = await api.outros.totext('URL DO AUDIO');
console.log(totext);
```

### textImg
Gera imagem a partir de texto.
```javascript
const textImg = await api.outros.textImg('Yuta APIs');
// buffer
```

Exemplo salvando em arquivo:
```javascript
import { writeFile } from 'node:fs/promises';

const textImg = await api.outros.textImg('Yuta APIs');
await writeFile('textimg.png', textImg);
```

### meme
Retorna um meme aleatório.
```javascript
const meme = await api.outros.meme();
console.log(meme);
```

### buscarLocal
Busca local por texto.
```javascript
const buscarLocal = await api.outros.buscarLocal('lanchonete em São Paulo');
console.log(buscarLocal);
```

### shazam
Identifica música a partir de URL de áudio.
```javascript
const shazam = await api.outros.shazam('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
console.log(shazam);
```

---

## Upload

### api.upload
Faz upload de arquivo em buffer para obter um link público.
```javascript
import { readFile } from 'node:fs/promises';

const buffer = await readFile('./assets/foto.jpg'); // buffer
const upload = await api.upload(buffer, 'foto.jpg', 'image/jpeg');
console.log(upload);
```

---

* By [Yuta Apis](https://yuta-apis.xyz)
* Criado por: Lm Only & Nk Petrov
* Versão: beta

License MIT
