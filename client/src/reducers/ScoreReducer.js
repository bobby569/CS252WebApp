import { UPDATE_SCORE } from '../actions/types';

export default function(state, action) {
	switch (action.type) {
		case UPDATE_SCORE:
			return 0;
	}
	return 0;
}
