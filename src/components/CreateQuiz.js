import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../reuseComponent/TextInput';
import CloseIcon from '../asset/black-cancel.png';

const CreateQuiz = () => {
	const navigate = useNavigate();
	const [inputData, setInputData] = useState({});
	const [isDisable, setIsDisable] = useState(false);

	const onChangeHandler = (e) => {
		const id = e.target.id;
		const value = e.target.value;

		setInputData({ ...inputData, [id]: value });
	};

	const createQuizHandler = async (e) => {
		e.preventDefault();
		if (
			inputData.name === undefined ||
			inputData.description === undefined ||
			inputData.points === undefined ||
			inputData.timeLimit === undefined
		) {
			return toast.warn(
				'Either quiz name, description, points and time limit must not be empty'
			);
		}
		setIsDisable(true);
		try {
			await addDoc(collection(db, 'quiz'), {
				...inputData,
				isDelete: false,
				isEditing: false,
				isAddQuestion: false,
				quesOptions: [],
			});
			toast.success('Quiz successfully created!');
			setIsDisable(false);
			navigate('/quiz');
		} catch (err) {
			console.log(err);
			toast.error('Please check your internet connection!');
			setIsDisable(false);
		}
	};

	return (
		<div className="w-full h-full m-auto flex flex-col justify-center items-center absolute inset-0 bg-black-opacity">
			<div
				className="w-[95%] md:w-[90.5%] lg:w-[850px] h-fit m-auto flex flex-col justify-center items-center
				absolute inset-0 text-grayish-blue bg-white rounded-lg"
			>
				<div className="w-11/12 mx-auto py-5 flex flex-row justify-between items-center">
					<p className="text-dark-blue font-semibold text-lg xs:text-xl">
						Create Quiz
					</p>
					<img
						src={CloseIcon}
						alt="close icon"
						onClick={() => navigate(-1)}
						className="cursor-pointer"
					/>
				</div>

				<form
					onSubmit={createQuizHandler}
					className="w-11/12 mx-auto py-5 flex flex-col justify-start gap-5"
				>
					<TextInput
						id={'name'}
						type={'text'}
						placeholder={'Name'}
						onChangeHandler={onChangeHandler}
					/>
					<TextInput
						id={'description'}
						type={'text'}
						placeholder={'Quiz description'}
						onChangeHandler={onChangeHandler}
					/>
					<TextInput
						id={'points'}
						type={'number'}
						placeholder={'Total points'}
						onChangeHandler={onChangeHandler}
					/>
					<TextInput
						id={'timeLimit'}
						type={'number'}
						placeholder={'Time limit'}
						onChangeHandler={onChangeHandler}
					/>

					<button
						disabled={isDisable}
						type="submit"
						className={`w-full xs:w-2/4 h-[40px] flex flex-col justify-center items-center text-white font-medium 
									 self-center rounded-lg ${
											isDisable ? `cursor-wait` : `cursor-pointer`
										} bg-moderate-blue hover:opacity-60 outline-none border-none`}
					>
						Create Quiz
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateQuiz;
