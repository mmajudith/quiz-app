import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllQuiz = createAsyncThunk('getAllQuiz', async (quiz) => {
	try {
		let allQuiz = [];
		allQuiz = [...quiz];

		return allQuiz;
	} catch (err) {
		console.log(err, 'error fetching all the quiz');
	}
});
