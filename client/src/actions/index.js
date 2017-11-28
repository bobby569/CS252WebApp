import axios from 'axios';
import * as TYPE from 'types';

export function moveUp() {
	const request = null;

	return {
		type: TYPE.MOVE_UP,
		payload: request
	};
}

export function moveDown() {
	return {
		type: TYPE.MOVE_DOWN,
		payload: null
	};
}

export function moveLeft() {
	return {
		type: TYPE.MOVE_LEFT,
		payload: null
	};
}

export function moveRight() {
	return {
		type: TYPE.MOVE_RIGHT,
		payload: null
	};
}

export function init() {
	const matrix = null;

	return {
		type: INIT,
		payload: matrix
	};
}
