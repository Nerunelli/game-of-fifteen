interface IProps {
	children: React.ReactNode;
}

export const Text: React.FC<IProps> = ({ children }) => {
	return (
		<div
			style={{
				textShadow: '0 0 10px #fbc4ff',
			}}
			className="text-2xl font-semibold tracking-widest text-white"
		>
			{children}
		</div>
	);
};
