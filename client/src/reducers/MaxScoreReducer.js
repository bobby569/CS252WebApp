import { MAX_SCORE } from '../actions/types';

export default function(state, action) {
	switch (action.type) {
		case MAX_SCORE:
			return action.payload.data.score;
		default:
			return 0;
	}
}
