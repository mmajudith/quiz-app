import { Link } from 'react-router-dom';

const ShowResults = ({ count, point, points, questionsOption }) => {
	return (
		<div className="w-full h-fit m-auto mt-3 text-lg flex flex-col justify-center items-center gap-2">
			<h1>Final Results</h1>
			<p>
				{count} out of {questionsOption.length}
			</p>
			{count === questionsOption.length ? (
				<p>
					Total Score is{' '}
					<span className="font-medium text-xl text-dark-blue">{points}</span>{' '}
					congratulations you get all the answers correct!
				</p>
			) : (
				<p>
					Total Score is{' '}
					<span className="font-medium text-xl text-dark-blue">{point}</span>{' '}
					out of {points}
				</p>
			)}
			<p
				className="w-[130px] h-[35px] rounded-md flex flex-col justify-center items-center text-white font-medium
				bg-dark-blue cursor-pointer hover:opacity-60"
			>
				<Link to="/quiz"> Back to quiz</Link>
			</p>
		</div>
	);
};

export default ShowResults;
