/**
 * Analisa a URL do Instagram e extrai o tipo de recurso.
 * @param {string} url
 * @returns {{ type: 'media' | 'profile' | 'story' | null, id?: string, username?: string }}
 */
export function parseInstagramUrl(url) {
    if (!url || typeof url !== 'string') return { type: null };

    // Captura os dois primeiros segmentos do pathname após o domínio
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.-]+)(?:\/([a-zA-Z0-9_.-]+))?/i);
    if (!match) return { type: null };

    const [, seg1] = match;

    // Posts, Reels e IGTV
    if (/^(p|reel|reels|tv)$/i.test(seg1)) {
        return { type: 'media' };
    }

    // Stories
    if (/^stories$/i.test(seg1)) {
        return { type: 'story' };
    }

    // Ignora rotas internas do Instagram
    if (/^(explore|direct|accounts|about|developer|legal)$/i.test(seg1)) {
        return { type: null };
    }

    // Qualquer outro segmento inicial é @username de perfil
    return { type: 'profile' };
}


/**
 * Baixa posts/reels do Instagram através da url.
 * @param {string} url 
 * @param {import('yutaapis').RouteNames} api 
 */
export async function igdl(url, api) {
    const { type } = parseInstagramUrl(url);

    // Aborta instantaneamente se for perfil, story ou URL inválida
    if (type !== 'media') return null;

    const MAX_RETRIES = 5;

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const data = await api.downloads.instavideo(url);

            if (data?.status) return data;
        } catch { }
    }

    return null;
}