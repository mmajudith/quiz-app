import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleDelete } from '../reduxtoolkit/features/quizReducer';

const DeleteQuiz = ({ id, name }) => {
	const dispatch = useDispatch();

	const deleteQuiz = async (id, name) => {
		try {
			await deleteDoc(doc(db, 'quiz', id));
			toast.success(`${name} quiz successfully deleted!`);
			dispatch(toggleDelete(id));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="w-screen h-screen m-auto flex flex-col justify-center items-center bg-black-opacity fixed inset-0 z-20">
			<div className="w-[90%] sm:w-[380px] h-fit mx-auto bg-white rounded-lg">
				<p className="w-[88%] mx-auto my-5 text-dark-blue font-semibold text-xl">
					Delete Quiz
				</p>
				<div className="w-[88%] mx-auto">
					<p className="w-11/12 text-sm text-grayish-blue">
						Are you sure you want to delete {name} quiz? This will remove the
						quiz and can't be undone.
					</p>
				</div>
				<div className="w-[88%] mx-auto my-5 flex flex-row justify-between items-center">
					<p
						onClick={() => dispatch(toggleDelete(id))}
						className="cursor-pointer w-[45%] h-10 bg-grayish-blue text-white rounded-lg text-base
                                flex flex-col justify-center items-center hover:opacity-60"
					>
						No, Cancel
					</p>
					<p
						onClick={() => deleteQuiz(id, name)}
						className="cursor-pointer w-[45%] h-10 bg-soft-red text-white rounded-lg text-base
                            flex flex-col justify-center items-center hover:opacity-60"
					>
						Yes, Delete
					</p>
				</div>
			</div>
		</div>
	);
};

export default DeleteQuiz;
