import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { toggleEditQuiz } from '../reduxtoolkit/features/quizReducer';
import TextInput from '../reuseComponent/TextInput';

const EditQuiz = ({ id, quiz }) => {
	const dispatch = useDispatch();
	const [quizData, setQuizData] = useState(quiz);

	const handleQuizInfoChange = (e) => {
		let temp = { ...quizData };
		temp[e.target.id] = e.target.value;

		setQuizData(temp);
	};

	const handleQuestionChange = (e, index) => {
		const { id, value } = e.target;
		const tempQuestion = {
			...quizData,
			quesOptions: [...quizData.quesOptions],
		};
		tempQuestion.quesOptions[index] = {
			...tempQuestion.quesOptions[index],
			[id]: value,
		};

		setQuizData(tempQuestion);
	};

	const handleOptionChange = (e, index, j) => {
		const { id, value } = e.target;
		const tempOptions = {
			...quizData,
			quesOptions: [...quizData.quesOptions],
		};
		tempOptions.quesOptions[index] = {
			...tempOptions.quesOptions[index],
			options: [...tempOptions.quesOptions[index].options],
		};
		tempOptions.quesOptions[index].options[j] = {
			...tempOptions.quesOptions[index].options[j],
			[id]: value,
		};

		setQuizData(tempOptions);
	};

	const updateHandler = async (e) => {
		e.preventDefault();
		const editRef = doc(db, 'quiz', id);
		const data = { ...quizData, isEditing: false };
		await setDoc(editRef, data, { merge: true });
		toast.success(`${quizData.name} quiz field has been updated successfully.`);
	};

	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center bg-black-opacity fixed inset-0 z-20">
			<form
				onSubmit={updateHandler}
				className="w-[97%] md:w-[95.5%] lg:w-[850px] h-fit my-10 p-7 rounded-lg overflow-y-scroll bg-white"
			>
				<div className="w-full h-fit mb-10 flex flex-col justify-center gap-4">
					<TextInput
						id={'name'}
						type={'text'}
						value={quizData.name}
						onChangeHandler={(e) => handleQuizInfoChange(e)}
					/>
					<TextInput
						id={'description'}
						type={'text'}
						value={quizData.description}
						onChangeHandler={(e) => handleQuizInfoChange(e)}
					/>
					<TextInput
						id={'points'}
						type={'text'}
						value={quizData.points}
						onChangeHandler={(e) => handleQuizInfoChange(e)}
					/>
					<TextInput
						id={'timeLimit'}
						type={'text'}
						value={quizData.timeLimit}
						onChangeHandler={(e) => handleQuizInfoChange(e)}
					/>
				</div>
				{quizData.quesOptions.length > 0 ? (
					quizData.quesOptions.map((question, index) => (
						<div
							className="w-full h-fit mb-10 flex flex-col justify-center gap-4"
							key={index}
						>
							<p className="w-full text-dark-blue font-semibold text-lg text-center">
								Question and Options
							</p>
							<TextInput
								id={'question'}
								type={'text'}
								value={question.question}
								onChangeHandler={(e) => handleQuestionChange(e, index)}
							/>
							{question.options.map((option, j) => (
								<div
									className={`w-full h-fit flex ${
										option.isCorrect ? `flex-row gap-1` : `flex-col gap-4`
									} justify-center`}
									key={j}
								>
									{option.isCorrect && (
										<p className="w-fit xs:w-[20%] h-[40px] flex flex-col justify-center items-center text-dark-blue font-medium">
											Correct Answer:
										</p>
									)}
									<TextInput
										id={'text'}
										type={'text'}
										value={option.text}
										onChangeHandler={(e) => handleOptionChange(e, index, j)}
									/>
								</div>
							))}
						</div>
					))
				) : (
					<p className="w-11/12 h-fit mx-auto text-dark-blue text-center font-medium text-lg">
						No questions and options added...
					</p>
				)}
				<div className="w-full h-fit mx-auto mt-7 flex flex-row justify-between items-center">
					<p
						onClick={() => dispatch(toggleEditQuiz(id))}
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
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditQuiz;
