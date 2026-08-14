import { request } from 'undici';

const BASE_URL = 'https://www.youtube.com/results';
const DEFAULT_YT_URL = 'https://www.youtube.com/watch?v=';
const YT_DATA_START = 'var ytInitialData = ';

async function fetchHTML(url) {
    const { statusCode, body } = await request(url, {
       // maxRedirections: 3,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive'
        }
    });

    if (statusCode !== 200) {
        await body.dump(); 
        throw new Error(`Request failed with status code: ${statusCode}`);
    }

    return body.text();
}

function extractInitialData(html) {
    const startIdx = html.indexOf(YT_DATA_START);
    if (startIdx === -1) return null;

    const jsonStart = startIdx + YT_DATA_START.length;
    const endIdx = html.indexOf(';</script>', jsonStart);
    if (endIdx === -1) return null;

    try {
        return JSON.parse(html.slice(jsonStart, endIdx));
    } catch {
        return null;
    }
}

function createResults(data) {
    const results = { all: [] };
    const contents = data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents;
    
    if (!contents || !contents[0]?.itemSectionRenderer?.contents) return results;

    const items = contents[0].itemSectionRenderer.contents;
    const len = items.length;

    for (let i = 0; i < len; i++) {
        const item = items[i];
        
        if (!item.videoRenderer) continue;

        const video = item.videoRenderer;
        const thumbs = video.thumbnail?.thumbnails;
        const snippets = video.detailedMetadataSnippets?.[0]?.snippetText?.runs;
        
        let description = '';
        if (snippets) {
            const snippetsLen = snippets.length;
            for (let j = 0; j < snippetsLen; j++) {
                description += snippets[j].text;
            }
        }

        results.all.push({
            type: 'video',
            videoId: video.videoId,
            title: video.title?.runs?.[0]?.text || '',
            url: DEFAULT_YT_URL + video.videoId,
            image: thumbs && thumbs.length > 0 ? thumbs[thumbs.length - 1].url : '',
            author: { name: video.longBylineText?.runs?.[0]?.text || '' },
            description,
            views: video.viewCountText?.simpleText || '',
            timestamp: video.lengthText?.simpleText || '',
            ago: video.publishedTimeText?.simpleText || ''
        });
    }

    return results;
}

export async function yts(query) {
    const params = new URLSearchParams({
        app: 'desktop',
        sp: 'mAEA',
        hl: 'en',
        search_query: query
    });

    try {
        const html = await fetchHTML(`${BASE_URL}?${params.toString()}`);
        const ytData = extractInitialData(html);

        if (!ytData) throw new Error('ytInitialData not found in HTML');

        return createResults(ytData);
    } catch (error) {
        throw new Error(error.message || error);
    }
}
