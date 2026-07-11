'use strict';
/**
 * Módulo de busca rápida no YouTube
 * Retorna resultados de vídeos como { link, título, autor, etc }
 * @author Lm
 */
const { load } = require('cheerio');
const { request } = require('undici');
const BASE_URL = 'https://www.youtube.com/results';
const DEFAULT_YT_URL = 'https://www.youtube.com/watch?v=';
/** Undici http request */
async function requestURL(url, options) {
    const { statusCode, headers, body } = await request(url, options);
    const code = statusCode.toString();

    if (code[0] === '2') return body.text();
    if (code[0] === '3') return requestURL(headers.location, options);

    const e = new Error(`Failed to request with status code: ${code}`);
    e.statusCode = statusCode;
    throw e;
}
async function yts(query) {
    try {
        const payload = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
            }
        };
        const params = new URLSearchParams({
            app: 'desktop',
            sp: 'mAEA',
            hl: 'en',
            search_query: query
        });
        const html = await requestURL(`${BASE_URL}?${params.toString()}`, payload);
        const ytData = getytInitialData(html);
        if (!ytData) throw new Error('ytInitialData not found');
        return createResults(ytData);
    } catch (e) {
        throw new Error(e.message || e);
    }
}
function getytInitialData(html) {
    const $ = load(html);
    let ytData;
    $('script').each((i, el) => {
        const script = $(el).html();
        if (!script) return;
        const regex = /var ytInitialData = (.+?);<\/script>/s.exec(script + '</script>');
        if (regex) ytData = JSON.parse(regex[1]);
    });
    return ytData;
}
function createResults(data) {
    const results = { all: [] };
    const contents = data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
    for (const item of contents) {
        const type = Object.keys(item)[0];
        const data = item[type];
        if (type === 'videoRenderer') {
            results.all.push({
                type: 'video',
                videoId: data.videoId,
                title: data.title?.runs?.[0]?.text || '',
                url: DEFAULT_YT_URL + data.videoId,
                image: data.thumbnail?.thumbnails?.pop()?.url || '',
                author: { name: data.longBylineText?.runs?.[0]?.text },
                description: data.detailedMetadataSnippets?.[0]?.snippetText?.runs?.map(r => r.text).join('') || '',
                views: data.viewCountText?.simpleText || '',
                timestamp: data.lengthText?.simpleText || '',
                ago: data.publishedTimeText?.simpleText || ''
            });
        }
    }
    return results;
}
exports.yts = yts;
