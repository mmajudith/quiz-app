import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logOut } from '../reduxtoolkit/actionsCreator/logInOutActions';

const Header = () => {
	const { currentUser } = useSelector((state) => state.authSlice);
	const dispatch = useDispatch();

	return (
		<header className="w-full h-fit m-auto bg-moderate-blue shadow-xl py-4">
			<div className="max-w-screen-2xl h-fit m-auto">
				<nav className="w-11/12 h-fit m-auto flex flex-row justify-between items-center gap-3">
					<p className="font-bold">QuizLogo</p>
					{currentUser ? (
						<ul className="flex flex-row justify-between items-center gap-3 xs:gap-9 font-semibold">
							{[['Home', '/'], ['Go to quiz', '/quiz'], ['LogOut']].map(
								([list, url], index) => (
									<motion.li
										whileHover={{ scale: 1.2 }}
										transition={{ duration: 0.8, ease: 'easeInOut' }}
										key={index}
									>
										{list === 'LogOut' ? (
											<span
												className="cursor-pointer"
												onClick={() => dispatch(logOut())}
											>
												{list}
											</span>
										) : (
											<Link to={url}>{list}</Link>
										)}
									</motion.li>
								)
							)}
						</ul>
					) : (
						<p className="flex flex-col justify-end items-center font-semibold">
							<Link to={'/login'}>LogIn</Link>
						</p>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
