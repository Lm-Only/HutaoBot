import { load } from 'cheerio';

const post = async (url, form) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: form
        });

        return {
            url: response.url,
            data: await response.text()
        };
    } catch (e) {
        throw new Error(`Error in POST request: ${e.message}`);
    }
};

class WebToMP4 {
    constructor(url = 'https://ezgif.com/webp-to-mp4') {
        this.url = url;
    }

    async upload(file) {
        try {
            const form = new FormData();

            form.append('new-image-url', '');
            form.append(
                'new-image',
                new Blob([file], { type: 'image/webp' }),
                'image.webp'
            );

            const html = await post(this.url, form);

            return load(html.data);
        } catch (e) {
            throw new Error(`Error during upload: ${e.message}`);
        }
    }

    async getVideoUrl($) {
        try {
            const form = new FormData();
            const obj = {};

            $('form input[name]').each((_, el) => {
                const name = $(el).attr('name');
                const value = $(el).val();

                obj[name] = value;
                form.append(name, value);
            });

            const html = await post(`${this.url}/${obj.file}`, form);
            const $$ = load(html.data);

            return new URL(
                $$('div#output > p.outfile > video > source').attr('src'),
                html.url
            ).toString();
        } catch (e) {
            throw new Error(`Error retrieving video URL: ${e.message}`);
        }
    }
}

const webp_mp4 = async (file) => {
    try {
        const server = new WebToMP4();
        const $ = await server.upload(file);

        return await server.getVideoUrl($);
    } catch (e) {
        throw new Error(`Conversion failed: ${e.message}`);
    }
};

export default webp_mp4;
