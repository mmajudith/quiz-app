import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleDelete } from '../reduxtoolkit/features/quizReducer';
import DeleteIcon from '../asset/icon-delete.svg';

const DeleteQuesOptions = ({ id, name, quesOptions }) => {
	const dispatch = useDispatch();

	const deleteQuestion = async (question) => {
		const questionRef = doc(db, 'quiz', id);
		await updateDoc(questionRef, {
			quesOptions: arrayRemove({ ...question }),
		});
		toast.success(`${name} question and option successfully deleted.`);
	};

	return (
		<div className="w-screen h-screen m-auto flex flex-col justify-center items-center bg-black-opacity fixed inset-0 z-20">
			<div className="w-[97%] md:w-[95.5%] lg:w-[850px] h-fit my-10 p-7 rounded-lg overflow-y-scroll bg-white">
				{quesOptions.length > 0 ? (
					quesOptions.map((question, index) => (
						<div
							className="w-full h-fit mb-10 flex flex-col justify-center gap-4"
							key={index}
						>
							<div className="w-full flex flex-row justify-between items-center gap-4">
								<p className="text-dark-blue font-semibold text-lg text-center">
									{question.question}
								</p>
								<img
									className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer text-dark-blue"
									onClick={() => deleteQuestion(question)}
									src={DeleteIcon}
									alt="delete icon"
								/>
							</div>

							{question.options.map((option, index) => (
								<div
									className={`w-full h-fit flex flex-col gap-2 justify-center`}
									key={index}
								>
									<p className="">{option.text}</p>
								</div>
							))}
						</div>
					))
				) : (
					<p className="w-11/12 h-fit mx-auto text-dark-blue text-center font-medium text-lg">
						Nothing to delete...
					</p>
				)}
				<div className="w-[88%] mx-auto my-5 flex flex-col justify-center items-center">
					<p
						onClick={() => dispatch(toggleDelete(id))}
						className="cursor-pointer w-[45%] h-10 bg-grayish-blue text-white rounded-lg text-base
                                flex flex-col justify-center items-center hover:opacity-60"
					>
						Cancel
					</p>
				</div>
			</div>
		</div>
	);
};

export default DeleteQuesOptions;
