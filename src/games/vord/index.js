/**
 * @license
 * Copyright 2024 Lm_only999
 *
 * A truth or dare multiplayer game.
 * By Lm.
 */

import { existsSync, readFileSync } from "node:fs"
import { WRT_FL } from "../../utils/generics.js";

import question from './data/questions.json' with { type: 'json' };

const FILE_SESSION = './src/games/vord/database';

function WRITE_SESSION(fileData, session) {
	const database = `${FILE_SESSION}/${session}.json`;
	WRT_FL(database, fileData);
}

export const startGame = (session, base) => {
	try {
		
		const array = [];
		
		const turno = base.participants[Math.floor(Math.random() * base.participants.length)];
		
		for (const i of base.participants) {
			if (i === turno) {
				continue;
			} else {
				array.push(i);
			}
		}
		
		base.status = true;
		base.turn = turno;
		base.participants = array;
		
		WRITE_SESSION(base, session);
		return {
			turn: turno
		};
	} catch (e) {
		console.error(e);
	}
};

export const setGame = (session) => {
	try {
		const database = `${FILE_SESSION}/${session}.json`;
		if (!existsSync(database)) {
			
			const data = {
				id: session,
				turn: null,
				challenge: null,
				question: null,
				status: false,
				completed: false,
				participants: []
			};
			WRITE_SESSION(data, session);
			return data;
		} else {
			const readSession = JSON.parse(readFileSync(database));
			return readSession;
		}
	} catch (e) {
		console.error("Erro ao ler o arquivo: ", e);
		return null;
	}
};

/**
 * Move a vez de cada jogador.
 */

export const movingUser = (session) => {
	const base = setGame(session);
	const currentTurnUser = base.turn;
	
	if (base.participants.length === 0) {
		throw new Error("Não há participantes suficientes para mover.");
	}
	
	const nextUser = base.participants.shift();
	
	base.turn = nextUser;
	base.participants.push(currentTurnUser);
	
	base.challenge = null;
	base.question = null;
	base.completed = false;
	
	WRITE_SESSION(base, session);
	
	return {
		turn: nextUser
	};
};


/**
 * Retorna a escolha do usuário
 */

export const vordSet = (session, type) => {
	
	let isWriteFile = false;
	let randomQuest;
	
	const base = setGame(session);
	const gameTurn = base.turn;
	
	if (type === "verdade") {
		randomQuest = question[0].words[Math.floor(Math.random() * question[0].words.length)];
		base.challenge = "verdade";
		base.question = randomQuest;
		isWriteFile = true;
	}
	else {
		randomQuest = question[1].words[Math.floor(Math.random() * question[1].words.length)];
		base.challenge = "desafio";
		base.question = randomQuest;
		isWriteFile = true;
	}
	if (isWriteFile) {
		WRITE_SESSION(base, session);
	}
	return {
		turn: gameTurn,
		question: randomQuest
	};
};
