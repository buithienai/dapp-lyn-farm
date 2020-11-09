import { combineReducers } from 'redux';
import contractReducer from './contractReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	contractReducer,
	userReducer
});

export default rootReducer;