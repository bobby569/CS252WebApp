import axios from 'axios';

export const MOVE = 'MOVE';

export function moveBlock() {
	const request = null;

	return {
		type: MOVE,
		payload: request
	};
}
