import { motion } from 'framer-motion';

const Timer = ({ timePerSecond }) => {
	return (
		<motion.p
			initial={{ width: '100%', background: 'hsl(238, 40%, 52%)' }}
			animate={{ width: '0%', background: 'hsl(357, 100%, 86%)' }}
			transition={{ duration: timePerSecond }}
			className="h-[6px] absolute top-0 rounded-t-lg"
		></motion.p>
	);
};

export default Timer;
