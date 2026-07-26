/**
 * Este script foi criado por Lm Only
 * Teve analise de IA - path e arquivos
 * e os parametros FFMPEG foram de outro meio
 */

import { hutao } from '../system.js';
import { getAudio } from '../../handler.js';

import { readFile, unlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { exec } from 'node:child_process';
import { resolve } from 'node:path';
import { getFileBuffer, getUnixNumber } from '../../utils/generics.js';

import txt from '../../messages/messages.js';

async function clearFilesTemp(outputFileName, inputFileName) {
    try {
        if (existsSync(outputFileName)) {
            await unlink(outputFileName);
        }

        if (existsSync(inputFileName)) {
            await unlink(inputFileName);
        }
    } catch {} // não necessariamente
}

hutao.setCommand({
    name: 'Efeitos audio',
    description: 'Efeitos extras de audio',

    commands: [
        'blown',
        'nightcore'
    ],

    execute: async ({
        command,
        info,
        reply,
        from,
        prefixo,
        quoted,
        react
    }) => {
        const audioInfo = getAudio(info);

        if (!Boolean(audioInfo)) {
            return reply(`• 🌟 Marque um áudio com o comando *${prefixo + command}* 🤷‍♀️`);
        }

        await react('⏳️');
        reply(txt.wait());

        const mapCommands = {
            'blown': '-af "acrusher=.1:1:64:0:log"',
            'nightcore': '-filter:a "atempo=1.02,asetrate=44100*1.25"'
        };

        const param = mapCommands[command];
        const inputFileName = resolve(getUnixNumber('.mp3'));
        const outputFileName = resolve(getUnixNumber('999.mp3'));

        try {
            const audioBuffer = await getFileBuffer(audioInfo, 'audio');
            await writeFile(inputFileName, audioBuffer);

            exec(`ffmpeg -y -i "${inputFileName}" ${param} "${outputFileName}"`, async (error) => {
                if (error) {
                    console.error('[ FFMPEG ERROR ] - ', error);
                    await clearFilesTemp(outputFileName, inputFileName);

                    return reply(txt.erros.command_error_executor);
                }

                const audioResult = await readFile(outputFileName);

                await hutao.sendMessage(from, {
                    audio: audioResult,
                    mimetype: 'audio/mpeg',
                    ptt: false
                }, {
                    quoted
                });
                
               await clearFilesTemp(outputFileName, inputFileName);
            });

        } catch (error) {
            console.error(error);
            reply(txt.erros.command_error_executor);

            await clearFilesTemp(outputFileName, inputFileName);
        }
    }
});