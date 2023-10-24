interface IProps {
	bg?: string;
	children: React.ReactNode;
}

export const Container: React.FC<IProps> = ({ children, bg }) => {
	return (
		<div
			style={{ background: bg }}
			className="flex h-screen w-screen flex-col items-center justify-center bg-container-bg"
		>
			{children}
		</div>
	);
};
