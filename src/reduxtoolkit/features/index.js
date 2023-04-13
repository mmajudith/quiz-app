import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authReducer';
import quizSlice from './quizReducer';

export default combineReducers({
	authSlice,
	quizSlice,
});
