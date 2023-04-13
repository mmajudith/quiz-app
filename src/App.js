import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuiz } from './reduxtoolkit/actionsCreator/quizActions';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import CreateQuiz from './components/CreateQuiz';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz';

const App = () => {
	const { currentUser } = useSelector((state) => state.authSlice);
	const dispatch = useDispatch();

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to="/login" />;
	};

	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, 'quiz'),
			(snapShot) => {
				let quiz = [];
				snapShot.docs.map((doc) => quiz.push({ id: doc.id, ...doc.data() }));
				dispatch(getAllQuiz(quiz));
			},
			(err) => console.log(err)
		);
		return () => unsub();
	}, []);

	return (
		<div className="w-full h-full m-auto text-base font-normal text-white">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Header />
			<Routes>
				<Route path="/">
					<Route path="login" element={<Login />} />
					<Route
						index
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="create-quiz"
						element={
							<RequireAuth>
								<CreateQuiz />
							</RequireAuth>
						}
					/>
					<Route
						path="quiz"
						element={
							<RequireAuth>
								<Quiz />
							</RequireAuth>
						}
					/>
					<Route
						path=":quizID"
						element={
							<RequireAuth>
								<StartQuiz />
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
};

export default App;
