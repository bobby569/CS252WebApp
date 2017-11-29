import {
	INIT,
	MOVE_UP,
	MOVE_LEFT,
	MOVE_DOWN,
	MOVE_RIGHT,
	SAVE_SCORE
} from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case INIT:
			return action.payload;
		default:
			return state;
	}
}
