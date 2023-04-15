import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	toggleEditQuiz,
	toggleDelete,
	toggleAddQuestion,
} from '../reduxtoolkit/features/quizReducer';
import EditQuiz from './EditQuiz';
import DeleteQuesOptions from './DeleteQuesOptions';
import AddQuestionOption from './AddQuestionOption';

const Quiz = () => {
	const allQuiz = useSelector((state) => state.quizSlice);
	const dispatch = useDispatch();

	return (
		<div className="max-w-[1440px] h-auto m-auto pt-16 pb-8">
			{allQuiz.loading === 'pending' && (
				<p className="w-11/12 h-fit m-auto text-center text-xl absolute inset-0 text-grayish-blue">
					Loading...
				</p>
			)}
			{allQuiz.loading === 'rejected' && (
				<p className="w-11/12 h-fit m-auto text-center text-xl absolute inset-0 text-grayish-blue">
					Please check your internet connection!
				</p>
			)}
			{allQuiz.loading === 'fulfilled' && (
				<>
					<div className="w-11/12 h-fit mx-auto mb-6">
						<p
							className="w-fit h-[40px] px-3 bg-dark-blue text-white cursor-pointer hover:opacity-60 rounded-md
								flex flex-col justify-center items-center"
						>
							<Link to="/create-quiz">Create a quiz</Link>
						</p>
					</div>
					<div className="w-11/12 h-fit mx-auto mb-5 text-grayish-blue">
						{allQuiz.quiz.length > 0 ? (
							allQuiz.quiz.map((quiz) => {
								return (
									<div key={quiz.id} className="w-full h-fit mx-auto mb-5">
										<div className="w-full h-auto mx-auto bg-white p-5 rounded-lg flex flex-col md:flex-row justify-start md:justify-between items-center gap-5 md:gap-7">
											<div className="w-full md:w-3/5 flex flex-col justify-start gap-3 text-dark-blue font-medium">
												<p>
													Name:{' '}
													<span className="text-grayish-blue font-normal ml-1">
														{quiz.name}
													</span>
												</p>
												<p>
													Description:{' '}
													<span className="text-grayish-blue font-normal ml-1">
														{quiz.description}
													</span>
												</p>
												<p>
													Points:{' '}
													<span className="text-grayish-blue font-normal ml-1">
														{quiz.points}
													</span>
												</p>
												<p>
													Time Limit:{' '}
													<span className="text-grayish-blue font-normal ml-1">
														{quiz.timeLimit} minutes
													</span>
												</p>
											</div>
											<div className="w-full md:w-fit flex flex-wrap xs:flex-row justify-between xs:justify-end items-center gap-3">
												<p className="w-fit h-fit px-3 py-1 bg-dark-blue text-white cursor-pointer hover:opacity-60 rounded-md text-center">
													<Link to={`/${quiz.id}`}>Start</Link>
												</p>
												<p
													onClick={() => {
														dispatch(toggleEditQuiz(quiz.id));
													}}
													className="w-fit h-fit px-3 py-1 bg-dark-blue text-white cursor-pointer hover:opacity-60 rounded-md text-center"
												>
													Edit
												</p>
												<p
													onClick={() => {
														dispatch(toggleDelete(quiz.id));
													}}
													className="w-fit h-fit px-3 py-1 bg-dark-blue text-white cursor-pointer hover:opacity-60 rounded-md text-center"
												>
													Delete question & options
												</p>
												<p
													onClick={() => {
														dispatch(toggleAddQuestion(quiz.id));
													}}
													className="w-fit h-fit px-3 py-1 bg-dark-blue text-white cursor-pointer hover:opacity-60 rounded-md text-center"
												>
													Add question & options
												</p>
											</div>
										</div>
										{quiz.isEditing && <EditQuiz id={quiz.id} quiz={quiz} />}
										{quiz.isDelete && (
											<DeleteQuesOptions
												id={quiz.id}
												name={quiz.name}
												quesOptions={quiz.quesOptions}
											/>
										)}
										{quiz.isAddQuestion && (
											<AddQuestionOption id={quiz.id} name={quiz.name} />
										)}
									</div>
								);
							})
						) : (
							<p className="w-11/12 h-fit m-auto text-dark-blue absolute inset-0 text-center font-medium text-xl">
								No quiz...
							</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Quiz;
