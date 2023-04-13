import { createSlice } from '@reduxjs/toolkit';
import { getAllQuiz } from '../actionsCreator/quizActions';

const initialState = {
	loading: 'pending',
	quiz: [],
};

export const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		toggleEditQuiz: (state, { payload }) => {
			state.quiz.map(
				(el) => (el.isEditing = el.id === payload && !el.isEditing)
			);
		},
		toggleDelete: (state, { payload }) => {
			state.quiz.map((el) => (el.isDelete = el.id === payload && !el.isDelete));
		},
		toggleAddQuestion: (state, { payload }) => {
			state.quiz.map(
				(el) => (el.isAddQuestion = el.id === payload && !el.isAddQuestion)
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllQuiz.pending, (state) => {
				state.loading = 'pending';
			})
			.addCase(getAllQuiz.rejected, (state) => {
				state.loading = 'rejected';
			})
			.addCase(getAllQuiz.fulfilled, (state, { payload }) => {
				state.loading = 'fulfilled';
				state.quiz = payload;
			});
	},
});

export const { toggleEditQuiz, toggleDelete, toggleAddQuestion } =
	quizSlice.actions;

export default quizSlice.reducer;
