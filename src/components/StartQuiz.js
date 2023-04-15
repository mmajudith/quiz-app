import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useParams } from 'react-router-dom';
import ShowResults from './ShowResults';
import Question from './Question';

const StartQuiz = () => {
	const { quizID } = useParams();

	const [quiz, setQuiz] = useState({
		loading: 'pending',
		data: {},
	});
	const [showResults, setShowResults] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [correctAns, setCorrectAns] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [isDisable, setIsDisable] = useState(false);
	const [point, setPoint] = useState(0);
	const [count, setCount] = useState(0);

	const timePerQuestion =
		quiz.data?.timeLimit === undefined
			? 0
			: (+quiz.data?.timeLimit * 60) / quiz.data?.quesOptions?.length;

	//Options clicked function
	const selectAnswerhandler = (isCorrect, index) => {
		setSelectedOption(index);
		setCorrectAns(isCorrect);
		setIsDisable(true);
	};

	//Next question function
	const nextQuestion = () => {
		if (correctAns) {
			let pointPerAns = Math.floor(
				quiz.data?.points / quiz.data?.quesOptions?.length
			);
			setPoint(point + pointPerAns);
			setCount(count + 1);
		}
		if (currentQuestion + 1 < quiz.data?.quesOptions?.length) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setShowResults(true);
		}
		setSelectedOption(null);
		setCorrectAns(false);
		setIsDisable(false);
	};

	useEffect(() => {
		const getSingleQuiz = async () => {
			const docRef = doc(db, 'quiz', quizID);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setQuiz((prev) => ({
					...prev,
					loading: 'fulfilled',
					data: docSnap.data(),
				}));
			} else {
				setQuiz((prev) => ({ ...prev, loading: 'rejected' }));
			}
		};
		getSingleQuiz();
	}, [quizID]);

	return (
		<div
			className="w-[95%] md:w-[90.5%] lg:w-[950px] h-fit m-auto py-5 flex flex-col justify-center items-center
				absolute inset-0 text-grayish-blue bg-white rounded-lg"
		>
			{quiz.loading === 'pending' && (
				<p className="w-11/12 h-fit m-auto py-10 text-center text-xl">
					Loading...
				</p>
			)}
			{quiz.loading === 'rejected' && (
				<p className="w-11/12 h-fit m-auto py-10 text-center text-xl">
					Please check your internet connection!
				</p>
			)}
			{quiz.loading === 'fulfilled' &&
				(!quiz.data?.quesOptions.length ? (
					<p className="w-full mx-auto text-center px-3 py-10 text-dark-blue font-medium">
						No questions and options added to {quiz.data?.name} quiz, click{' '}
						{'->'}{' '}
						<Link to="/quiz" className="text-moderate-blue">
							{' '}
							Here{' '}
						</Link>
						{'<-'} to go back to quiz to add questions and options
					</p>
				) : (
					<>
						<h1 className="text-dark-blue font-semibold text-xl">
							{quiz.data?.name} Quiz
						</h1>
						<div className="w-full h-auto mx-auto">
							{showResults ? (
								<ShowResults
									count={count}
									point={point}
									points={quiz.data?.points}
									questionsOption={quiz.data?.quesOptions}
								/>
							) : (
								<Question
									questionsOption={quiz.data?.quesOptions}
									currentQuestion={currentQuestion}
									isDisable={isDisable}
									selectAnswerhandler={selectAnswerhandler}
									nextQuestion={nextQuestion}
									selectedOption={selectedOption}
									timePerQuestion={timePerQuestion}
								/>
							)}
						</div>
					</>
				))}
		</div>
	);
};

export default StartQuiz;
