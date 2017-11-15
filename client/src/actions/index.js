import axios from 'axios';

const URL = '';

export const MOVE = 'MOVE';
export const SAVE_SCORE = 'SAVE_SCORE';

export function moveBlock() {
	const request = null;

	return {
		type: MOVE,
		payload: request
	};
}

export function saveScore() {
	const request = null;

	return {
		type: SAVE_SCORE,
		payload: request
	};
}
