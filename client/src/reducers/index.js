import { combineReducers } from 'redux';
import MatrixReducer from './MatrixReducer';
import MaxScoreReducer from './MaxScoreReducer';
import ScoreReducer from './ScoreReducer';

const rootReducer = combineReducers({
	matrix: MatrixReducer,
	maxScore: MaxScoreReducer,
	score: ScoreReducer
});

export default rootReducer;
