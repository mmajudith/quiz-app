import Button from '../reuseComponent/Button';

const Home = () => {
	return (
		<div className="w-11/12 xs:w-[400px] h-fit m-auto flex flex-col justify-center items-center gap-5 xs:gap-7 absolute inset-0">
			<Button text={'Create a quiz'} />
			<Button text={'Go to quiz'} />
		</div>
	);
};

export default Home;
