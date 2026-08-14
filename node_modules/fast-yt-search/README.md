# Fast YouTube Search

Scraper rápido e otimizado para nodeJS.

<details>
    <summary>
        <b>O que é?</b>
    </summary>

* Fast Youtube Search é um módulo adaptado para ser mais rápido e direto possível
* Ele utiliza apenas 1 dependência (Undici HTTP) o que torna muito mais leve
* O código é totalmente destinado a consumir a menor quantidade de recursos possíveis

## Como funciona?

1. Faz o request diretamente para o [YouTube](https://www.youtube.com) com parâmetro "query"
2. Recebe os dados<string> e parseia a HTML de forma nativa sem uso extra de outros módulos (Cheerio / JSDOM)
3. Organiza um resultado semelhante ao módulo **yt-search** através dos metadatos recebidos
4. Retorna o resultado exatamente da mesma forma, isso ajuda e evitar ter que adaptar a resposta. Basta apenas mudar o nome do módulo importado. (yt-search -> fast-yt-search)

## Como isso surgiu?

* O Fast YouTube Search é apenas uma adaptação de código do que é necessário usar
* Ele elimina coisas inutilizáveis, tornando o módulo muito mais simples
* Ou seja, apenas foi pego partes importantes de um código semelhante, e otimizado para baixo consumo
* Veja os releases para saber o que mudou



</details>

## Installation

```shell
npm install github:Lm-Only/fast-yt-search
```

## Import

ESM

```javascript
import { yts } from 'fast-yt-search';
```
CJS

```javascript
const { yts } = require('fast-yt-search');
```

## Quickstart

```javascript
(async () => {
    const resultados = await yts('Hutao');
    console.log(resultados.all[0]);
})();
```

## LICENSE (MIT)

Código aberto para qualquer um usar. Use com moderação!
@author Lm Only
