import { TRANSFORM_DURATION } from '../../consts';
import { ICell, ICellPosition, IColors } from '../../models';
import { countDelay, isCorrectCoords } from '../../utils';
import { Text } from '../Text';

interface IProps {
	el: ICell;
	empty?: ICellPosition;
	colors?: IColors;
	onClick: (a: ICell) => void;
	solved: boolean;
	flipOrder: number;
}

export const Cell: React.FC<IProps> = ({
	el,
	colors,
	onClick,
	solved,
	flipOrder,
}) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onClick(el);
	};
	const isDone = isCorrectCoords(el);

	return (
		<div
			style={{
				top: `calc(${el.position.y * 25}%)`,
				left: `calc(${el.position.x * 25}%)`,
				transition: `top 0.15s, left 0.15s, transform ${TRANSFORM_DURATION}s ${countDelay(
					flipOrder,
				)}s`,
				transform: solved ? 'rotateY(90deg)' : undefined,
				transformStyle: 'preserve-3d',
				perspective: '200px',
			}}
			className="absolute z-50 inline-block h-1/4 w-1/4 p-cell"
		>
			<button
				className="h-full w-full rounded-cell bg-gradient-to-br from-dark-blue to-violet text-2xl font-semibold text-white shadow-wrong-cell"
				style={{
					textShadow: '0 0 10px #fbc4ff',
					background: `linear-gradient(-45deg, ${colors?.cellBottom} 0%, ${colors?.cellTop} 100%)`,
					boxShadow: isDone
						? 'inset 0 0 10px 0px #FFFFFF'
						: 'inset 0 0 10px 0px #000000',
				}}
				onClick={handleClick}
				id={el.title}
				disabled={solved}
			>
				{el.title}
			</button>
		</div>
	);
};
