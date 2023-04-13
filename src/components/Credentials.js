import { useState } from 'react';
import { motion } from 'framer-motion';
import { defaultUser } from '../services/defaultUser';

const Credentials = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { email, password } = defaultUser;

	const isOpenHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="w-11/12 h-fit flex flex-col justify-center items-center gap-2">
			<p
				onClick={isOpenHandler}
				className="w-full h-fit m-auto pl-6 py-6 xs:py-7 bg-white shadow-2xl cursor-pointer rounded-lg"
			>
				Click to reveal test login details:
			</p>
			<motion.div
				animate={{
					opacity: isOpen ? 1 : 0,
					display: isOpen ? 'block' : 'none',
				}}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
				className="w-full h-fit m-auto pl-6 py-8 xs:py-9 bg-white shadow-2xl cursor-pointer rounded-lg gap-4"
			>
				<p>Email: {email}</p>
				<p>Password: {password}</p>
			</motion.div>
		</div>
	);
};

export default Credentials;
