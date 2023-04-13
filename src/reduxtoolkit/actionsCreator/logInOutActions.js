import { createAsyncThunk } from '@reduxjs/toolkit';

export const logIn = createAsyncThunk('login', async (user, thunkAPI) => {
	const { email } = user;

	if (email) {
		sessionStorage.setItem('user', email);
	}

	return email;
});

export const logOut = createAsyncThunk('logout', async () => {
	const user = sessionStorage.getItem('user');

	if (user) {
		sessionStorage.removeItem('user');
	}

	return null;
});
