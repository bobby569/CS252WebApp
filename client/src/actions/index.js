import axios from 'axios';

export const MOVE_UP = 'MOVE_UP';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const SAVE_SCORE = 'SAVE_SCORE';

export function moveUp() {
	const request = null;

	return {
		type: MOVE_UP,
		payload: request
	};
}
