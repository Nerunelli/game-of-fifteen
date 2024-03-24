import { useState } from 'react';
import cn from 'classnames';

interface IProps {
	onClick: () => void;
	clicked: boolean;
}

export const ShuffleButton: React.FC<IProps> = ({ onClick, clicked }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<button
			className={cn(
				'rounded-md border-01 border-solid border-light-violet px-10 py-4 text-xl font-semibold tracking-button text-blue shadow-button',
				'hover:border-0 hover:bg-blue hover:bg-gradient-to-br hover:text-black hover:shadow-button-hover',
			)}
			style={{
				textShadow: hovered ? 'none' : '0 0 20px #68edff',
				opacity: clicked ? '0%' : undefined,
				transition: 'opacity 0.6s',
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={onClick}
			disabled={clicked}
		>
			SHUFFLE
		</button>
	);
};
