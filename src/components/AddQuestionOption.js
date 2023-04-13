import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toggleAddQuestion } from '../reduxtoolkit/features/quizReducer';
import TextInput from '../reuseComponent/TextInput';

const AddQuestionOption = ({ id, name }) => {
	const dispatch = useDispatch();

	const [question, setQuestion] = useState('');
	const [correctAns, setCorrectAns] = useState('');
	const [firstWrongAns, setFirstWrongAns] = useState('');
	const [secondWrongAns, setSecondWrongAns] = useState('');
	const [thirdWrongAns, setThirdWrongAns] = useState('');

	const addQuestionHandler = async (e) => {
		e.preventDefault();
		if (
			correctAns === '' ||
			firstWrongAns === '' ||
			secondWrongAns === '' ||
			secondWrongAns === '' ||
			thirdWrongAns === ''
		) {
			return toast.warn('Please fill all the input fields');
		}
		const questionRef = doc(db, 'quiz', id);
		await updateDoc(questionRef, {
			quesOptions: arrayUnion({
				question,
				options: [
					{ text: firstWrongAns, isCorrect: false },
					{ text: correctAns, isCorrect: true },
					{ text: secondWrongAns, isCorrect: false },
					{ text: thirdWrongAns, isCorrect: false },
				],
			}),
		});
		toast.success(`${name} question and option successfully added!`);
	};

	return (
		<div className="w-screen h-screen m-auto flex flex-col justify-center items-center bg-black-opacity fixed inset-0 z-20">
			<form
				onSubmit={addQuestionHandler}
				className="w-[90%] sm:w-[450px] h-fit m-auto p-5 flex flex-col justify-center items-center gap-3 bg-white rounded-lg"
			>
				<TextInput
					id={'question'}
					type={'text'}
					placeholder={'question'}
					value={question}
					onChangeHandler={(e) => setQuestion(e.target.value)}
				/>
				<TextInput
					id={'text'}
					type={'text'}
					placeholder={'Correct Answer'}
					value={correctAns}
					onChangeHandler={(e) => setCorrectAns(e.target.value)}
				/>
				<TextInput
					id={'text'}
					type={'text'}
					placeholder={'Answer'}
					value={firstWrongAns}
					onChangeHandler={(e) => setFirstWrongAns(e.target.value)}
				/>
				<TextInput
					id={'text'}
					type={'text'}
					placeholder={'Answer'}
					value={secondWrongAns}
					onChangeHandler={(e) => setSecondWrongAns(e.target.value)}
				/>
				<TextInput
					id={'text'}
					type={'text'}
					placeholder={'Answer'}
					value={thirdWrongAns}
					onChangeHandler={(e) => setThirdWrongAns(e.target.value)}
				/>
				<div className="w-full h-fit mx-auto mt-5 flex flex-row justify-between items-center">
					<p
						onClick={() => dispatch(toggleAddQuestion(id))}
						className="cursor-pointer w-[45%] h-10 bg-grayish-blue text-white rounded-lg text-base
						flex flex-col justify-center items-center hover:opacity-60"
					>
						Cancel
					</p>
					<button
						type="submit"
						className="cursor-pointer w-[45%] h-10 bg-moderate-blue text-white rounded-lg text-base
                            flex flex-col justify-center items-center hover:opacity-60"
					>
						Add Question
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddQuestionOption;
