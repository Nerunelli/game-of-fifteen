interface IProps {
	bg: string;
	children: React.ReactNode;
}

export const Container: React.FC<IProps> = ({ children, bg }) => {
	return (
		<div
			style={{ background: bg }}
			className="flex w-screen h-screen bg-container-bg items-center justify-center flex-col"
		>
			{children}
		</div>
	);
};
