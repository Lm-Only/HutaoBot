//=============> ======== <==============\\
// Código aberto - Pelo dono 
import * as linkfy from 'linkifyjs';

import { load } from 'cheerio';
import { removerAcentos, useragent_1, request } from '../defaults/index.js';

const DEFAULT_OPTS = {
    requestOptions: {
        method: 'GET',
        headers: useragent_1,
    },
    dataType: 'text',
};

//=============> Play Store <==============\\
export const PlayStoreSearch = async (q) => {
    try {
        const BASE_URL = 'https://play.google.com';
        const data = await request(`${BASE_URL}/store/search?q=${removerAcentos(q)}&c=apps`, DEFAULT_OPTS);
        const $ = load(data);
        const dados = [];
        $('.VfPpkd-aGsRMb').each((i, e) => {
            dados.push({
                nome: $(e).find('.DdYX5:first').text().trim(),
                imagem: (($(e).find('img:first').attr('srcset') ? (linkfy.find($(e).find('img:first').attr('srcset'))?.pop()?.href || $(e).find('img:first').attr('src')) : $(e).find('img:first').attr('srcset')) || $(e).find('img:last').attr('srcset') ? (linkfy.find($(e).find('img:last').attr('srcset'))?.pop()?.href || $(e).find('img:last').attr('src')) : $(e).find('img:last').attr('srcset')).trim(),
                desenvolvedor: $(e).find('.wMUdtb:first').text().trim(),
                estrelas: $(e).find('.w2kbF:first').text().trim(),
                link: BASE_URL + $(e).find('a:first').attr('href')
            });
        });
        return {
            status: 200,
            criador: "Lm",
            resultado: dados
        };
    } catch (e) {
        throw e;
    }
};

//=============> Mercado Livre <==============\\
export const MercadoLivreSearch = async (q) => {
    try {
        const BASE_URL = 'https://lista.mercadolivre.com.br';
        const data = await request(`${BASE_URL}/${removerAcentos(q)}`, DEFAULT_OPTS);
        const $ = load(data);
        const dados = [];
        $('div.andes-card').each((i, e) => {
            const produto = $(e).find('h2:first').text()?.trim();
            const imagem = $(e).find('img:first').attr('data-src') || $(e).find('img:first').attr('src');
            const valor = $(e).find('.price-tag-amount').text()?.replace('R$', 'R$ ').trim();
            const link = $(e).find('a:first').attr('href');
            if (produto && imagem && valor && link) {
                dados.push({
                    produto,
                    imagem,
                    valor,
                    link
                });
            }
        });
        return {
            status: 200,
            criador: "Lm",
            resultado: dados
        };
    } catch (e) {
        throw e;
    }
};

//=============> Horóscopo <==============\\
export const Horoscopo = async (signo) => {
    try {
        const BASE_URL = 'https://www.somostodosum.com.br';
        const data = await request(`${BASE_URL}/horoscopo/signo/${removerAcentos(signo)}.html`, DEFAULT_OPTS);
        const $ = load(data);

        const img = `${BASE_URL}/horoscopo/img/${removerAcentos(signo)}.png`;
        const previsao = $('center h2').first().text().trim();

        const textoPrincipal = $('article.all-browsers')
            .first()
            .clone()
            .find('script, style, a, img, select')
            .remove()
            .end()
            .text()
            .replace(/\s+/g, ' ')
            .trim();

        return {
            status: 200,
            criador: "Lm",
            infoDoSigno: signo,
            resultado: [{
                imagem: img,
                previsao,
                textos: textoPrincipal
            }]
        };
    } catch (e) {
        console.error(e);
        throw e;
    }
};


//=============> Hentai Tube <==============\\
export const HentaisTubeSearch = async (q) => {
    try {
        const BASE_URL = 'https://www.hentaistube.com';
        const data = await request(`${BASE_URL}/buscar/?s=${removerAcentos(q)}`, DEFAULT_OPTS);
        const $ = load(data);
        const dados = [];
        $('.epiItem').each((i, e) => {
            dados.push({
                nome: $(e).find('a').attr('title'),
                imagem: $(e).find('img').attr('src'),
                link: $(e).find('a').attr('href')
            });
        });
        return {
            status: 200,
            criador: "Lm",
            resultado: dados
        };
    } catch (e) {
        throw e;
    }
};

//=============> Dicionário <==============\\
export const Dicionario = async (q) => {
    try {
        const BASE_URL = 'https://www.dicio.com.br';
        const data = await request(`${BASE_URL}/${removerAcentos(q)}/`, DEFAULT_OPTS);
        const $ = load(data);
        const dados = [];
        $('#content > div.col-xs-12.col-sm-7.col-md-8.p0.mb20 > div.card.card-main.mb10 > p > span').each((i, e) => {
            dados.push($(e).text().trim());
        });
        return {
            status: 200,
            criador: "Lm",
            imagem: $('#content > div.col-xs-12.col-sm-7.col-md-8.p0.mb20 > div.card.card-main.mb10 > picture > img').attr('src'),
            significado: dados.join('\n').trim()
        };
    } catch (e) {
        throw e;
    }
};
