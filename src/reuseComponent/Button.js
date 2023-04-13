import { Link } from 'react-router-dom';

const Button = ({ text }) => {
	return (
		<Link
			className="w-full h-[40px] xs:h-[45px]"
			to={`${text === `Create a quiz` ? `/create-quiz` : `/quiz`}`}
		>
			<button className="w-full h-full flex flex-col justify-center items-center text-white font-medium cursor-pointer bg-moderate-blue hover:opacity-60 rounded-md">
				{text}
			</button>
		</Link>
	);
};

export default Button;
