import { useEffect, useState } from 'react';
import Timer from './Timer';

const Question = ({
	questionsOption,
	currentQuestion,
	isDisable,
	selectAnswerhandler,
	nextQuestion,
	selectedOption,
	timePerSecond,
	setShowResults,
}) => {
	const [options, setOptions] = useState([]);

	const shuffleOptions = (options) => {
		for (let i = options.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[options[i], options[j]] = [options[j], options[i]];
		}
		return options;
	};

	useEffect(() => {
		const shuffledOpt = shuffleOptions(
			questionsOption[currentQuestion]?.options
		);
		setOptions(shuffledOpt);

		const timer = setTimeout(() => setShowResults(true), 1000 * timePerSecond);

		return () => clearTimeout(timer);
	}, [currentQuestion, questionsOption, timePerSecond, setShowResults]);

	return (
		<div className="w-full h-fit m-auto">
			<h2 className="text-dark-blue text-lg text-center">
				Question: {currentQuestion + 1} out of {questionsOption?.length}
			</h2>

			<Timer timePerSecond={timePerSecond} />

			<div className="w-full mx-auto px-5">
				<p>{questionsOption[currentQuestion]?.question}</p>
				<ul className="w-full h-fit mt-5 flex flex-col justify-start gap-2">
					{options.length > 0 &&
						options.map((option, index) => (
							<li
								key={index}
								onClick={() => selectAnswerhandler(option.isCorrect, index)}
								className={`w-full h-[35px] pl-5 cursor-pointer ${
									index === selectedOption
										? `bg-moderate-blue text-white border-none`
										: `bg-white text-grayish-blue border border-solid border-dark-blue`
								}  flex flex-col justify-center rounded`}
							>
								{option.text}
							</li>
						))}
				</ul>
			</div>

			<div className="w-full mx-auto mt-5 flex flex-col justify-end items-end ">
				<button
					disabled={isDisable ? false : true}
					onClick={(e) => nextQuestion(e)}
					className={`w-[100px] h-[40px] mr-5 rounded-md flex flex-col justify-center items-center text-white font-medium ${
						isDisable
							? `bg-dark-blue cursor-pointer hover:opacity-60`
							: `bg-grayish-blue cursor-auto hover:opacity-100`
					}`}
				>
					{currentQuestion === questionsOption.length - 1 ? 'Submit' : 'Next'}
				</button>
			</div>
		</div>
	);
};

export default Question;
