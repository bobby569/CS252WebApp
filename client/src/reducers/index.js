import { combineReducers } from 'redux';
import ScoreReducer from './ScoreReducer';
import MatrixReducer from './MatrixReducer';

const rootReducer = combineReducers({
	score: ScoreReducer,
	matrix: MatrixReducer
});

export default rootReducer;
