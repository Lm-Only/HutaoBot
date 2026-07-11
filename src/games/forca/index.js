/**
 * @fileoverview Forca game module
 * @author Lm Only
 * @version 1.0.0
 * @description This module provides functions to start a game session and verify user guesses for the Forca game.
 * @license MIT
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { stringNormalize, WRT_FL } from '../../utils/generics.js';

/**
 * Start a game with session and path;
 * @param {Object} params - objeto de instruções necessárias
 * [word|tema|dica|path]
 */
export const startSession = (params) => {
    try {
        if (!params) {
            throw new Error('Invalid parameters');
        }
        const { word, path } = params;
        const data = {
            session: path,
            word,
            tema: params.tema || null,
            dica: params.dica || null,
            acertos: 0,
            erros: 0,
            ended: false,
            win: false,
            usado: [],
            letrasY: [...stringNormalize(word).split('')],
            letrasX: [...word.split('').map(letra => letra !== ' ' ? '_' : ' ')]
        };
        WRT_FL(path, data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Verify if query includes;
 *
 * @param {String} path - Game session
 * @param {String} query - string
 */
export const verify = (query, path) => {
    try {
        if (!query || !path) {
            throw new Error('Invalid parameters');
        }
        if (typeof query !== 'string') {
            throw new Error('Query must be a string');
        }

        const data = JSON.parse(readFileSync(path));
        const queryToLC = stringNormalize(query).toLowerCase();
        if (query.length > 1) {
            const word_normalize = stringNormalize(data.word).toLowerCase();
            if (queryToLC === word_normalize) {
                data.win = true;
            }
            data.ended = true;
            return data;
        }

        let errou = true;
        if (data.letrasY.join('').toLowerCase().includes(queryToLC)) {
            data.letrasY.forEach((element, index) => {
                if (element.toLowerCase() === queryToLC) {
                    data.letrasX[index] = element;
                }
            });
            errou = false;
        }

        errou ? data.erros++ : data.acertos++;
        data.usado.push(queryToLC);
        data.ended = data.erros >= 6;

        if (data.letrasX.join('') === data.letrasY.join('')) {
            data.win = true;
            data.ended = true;
        }

        WRT_FL(path, data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
