import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../reduxtoolkit/actionsCreator/logInOutActions';
import Credentials from './Credentials';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email || !password) {
			return toast.warn('both email and password field are required!');
		}
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				dispatch(logIn(user));
				toast.success('Successfully login.');
				navigate('/');
			})
			.catch((error) => {
				toast.warn('Wrong email or password!');
			});
	};

	return (
		<div className="w-full h-fit m-auto flex flex-col justify-center items-center absolute inset-0">
			<div className="w-full xs:w-[400px] h-fit mx-auto text-dark-blue flex flex-col justify-center items-center gap-7">
				<Credentials />
				<form
					onSubmit={submitHandler}
					className="w-11/12 h-fit flex flex-col justify-center items-center gap-4"
				>
					<input
						className="w-full h-[40px] outline-none bg-very-light-gray placeholder-dark-blue border-b-dark-blue border-b-solid border-b pl-5"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="w-full h-[40px] outline-none bg-very-light-gray placeholder-dark-blue border-b-dark-blue border-b-solid border-b pl-5"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type={'submit'}
						className="w-full h-[40px] xs:h-[45px] flex flex-col justify-center items-center text-white font-medium cursor-pointer bg-moderate-blue hover:opacity-60 outline-none border-none"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
