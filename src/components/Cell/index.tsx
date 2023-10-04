import { useState } from 'react';
import { isMoveable } from '../../utils';
import { ICell } from './models';

interface IProps {
	el: ICell;
	empty: ICell;
	colors: { [a: string]: string };
}

export const Cell: React.FC<IProps> = ({ el, empty, colors }) => {
	const [position, setPosition] = useState({ x: el.x, y: el.y });
	const onClick = () => {
		console.log(isMoveable(el, empty));

		if (!isMoveable(el, empty)) {
			return;
		}
		const xDiff = empty.x - el.x;
		const yDiff = empty.y - el.y;
		console.log(empty, el, xDiff, yDiff);

		el.x += xDiff;
		el.y += yDiff;
		setPosition({ x: el.x, y: el.y });
	};

	return (
		<div
			className="inline-block w-1/4 h-1/4 p-cell absolute"
			style={{
				top: `calc(${position.y * 25}%)`,
				left: `calc(${position.x * 25}%)`,
			}}
		>
			<button
				className="w-full h-full bg-gradient-to-br from-dark-blue to-violet shadow-wrong-cell rounded-md text-3xl font-semibold text-white"
				// className={Styles[`cell${el.x < 2 && el.y == 0 ? el.x + 1 : ''}`]}
				style={{
					textShadow: '0 0 10px #fbc4ff',
					background: `linear-gradient(-45deg, ${colors.cellTop} 0%, ${colors.cellBottom} 100%)`,
				}}
				onClick={onClick}
			>
				{/* <div className=" w-full h-full border-solid border-cell border-1 rounded"> */}
				{el.title}
				{/* </div> */}
			</button>
		</div>
	);
};
