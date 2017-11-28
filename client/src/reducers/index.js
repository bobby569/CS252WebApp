import { combineReducers } from 'redux';
import MatrixReducer from './MatrixReducer';

const rootReducer = combineReducers({
	matrix: MatrixReducer
});

export default rootReducer;
