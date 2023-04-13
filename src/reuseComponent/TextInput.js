const TextInput = ({ id, type, placeholder, value, onChangeHandler }) => {
	return (
		<input
			className="w-full h-[40px] pl-5 bg-very-light-gray rounded-lg shadow-lg text-dark-blue border-none outline-none focus:border-moderate-blue focus:border-solid focus:border"
			id={id}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChangeHandler}
		/>
	);
};

export default TextInput;
