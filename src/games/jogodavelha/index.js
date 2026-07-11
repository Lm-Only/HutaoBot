import { WRT_FL } from '../../utils/generics.js';
import { 
    existsSync, 
    readFileSync 
} from 'node:fs';


function defineSave(obj, session) {
    const filePath = `./src/games/jogodavelha/db/${session}.json`;
    WRT_FL(filePath, obj);
}

/**
 * Função de definir ou obter a database de uma sessão 
 * 
 * @param {String|Number} session - sessão de onde o game está ativo ( grupo )
 * @returns {Object} retorna a informação do game
 */
export const setGame = (session) => {
    const filePath = `./src/games/jogodavelha/db/${session}.json`;

    if (!existsSync(filePath)) {
        const matrix = [
            ["1️⃣", "2️⃣", "3️⃣"],
            ["4️⃣", "5️⃣", "6️⃣"],
            ["7️⃣", "8️⃣", "9️⃣"]
        ];

        const newGame = {
            status: true,
            session,
            turn: 'X',
            X: null,
            O: null,
            isWin: false,
            winner: null,
            nine_push: [],
            _matrix: matrix
        };

        defineSave(newGame, session);
        return newGame;
    } else {
        return JSON.parse(readFileSync(filePath));
    }
};

function checkLineEquality(line) {
    return line.every(cell => cell === line[0]);
}

function horizontal(matrix) {
    for (const row of matrix) {
        if (checkLineEquality(row)) {
            return row[0];
        }
    }
    return false;
}

function vertical(matrix) {
    for (let col = 0; col < matrix.length; col++) {
        const column = matrix.map(row => row[col]);
        if (checkLineEquality(column)) {
            return column[0];
        }
    }
    return false;
}

function diagonalLTR(matrix) {
    const diagonal = matrix.map((row, idx) => row[idx]);
    return checkLineEquality(diagonal) ? diagonal[0] : false;
}

function diagonalRTL(matrix) {
    const diagonal = matrix.map((row, idx) => row[matrix.length - 1 - idx]);
    return checkLineEquality(diagonal) ? diagonal[0] : false;
}

function move(x, y, session) {
    const game = setGame(session);

    if (game.isWin) {
        return { status: false, message: `Game won by ${game.winner}` };
    }

    if (['❌', '⭕'].includes(game._matrix[x][y])) {
        return { status: false, message: `This spot is already filled by ${game._matrix[x][y]}` };
    }

    game._matrix[x][y] = game.turn === 'X' ? '❌' : '⭕';
    game.nine_push.push(game._matrix[x][y]);
    game.turn = game.turn === 'X' ? 'O' : 'X';

    defineSave(game, session);

    const winConditions = [
        horizontal(game._matrix),
        vertical(game._matrix),
        diagonalLTR(game._matrix),
        diagonalRTL(game._matrix)
    ];

    if (winConditions.includes('❌') || winConditions.includes('⭕')) {
        game.isWin = true;
        game.winner = game.turn === 'X' ? 'O' : 'X';
    } else if (game.nine_push.length >= 9) {
        game.isWin = true;
        game.winner = "DRAW";
    }

    defineSave(game, session);
    return game;
}

export const validmove = (number, session) => {
    const moveMap = {
        1: [0, 0],
        2: [0, 1],
        3: [0, 2],
        4: [1, 0],
        5: [1, 1],
        6: [1, 2],
        7: [2, 0],
        8: [2, 1],
        9: [2, 2]
    };

    const moveCoords = moveMap[Number(number)];
    return moveCoords ? move(...moveCoords, session) : false;
};
