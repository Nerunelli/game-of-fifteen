import { TRANSFORM_DURATION } from '../../consts';
import { ICell, ICellPosition } from '../../types/cell';
import { IColors } from '../../types/colorSettings';
import { isCorrectCoords } from '../../utils/correctCellsHelpers';
import { countDelay } from '../../utils/flipCellHelpers';

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
			className="absolute z-50 inline-block size-1/4 p-cell"
		>
			<button
				className="size-full rounded-cell bg-gradient-to-br from-dark-blue to-violet text-2xl font-semibold text-white shadow-wrong-cell"
				style={{
					textShadow: '0 0 10px #fbc4ff',
					background: `linear-gradient(-45deg, ${colors?.cellBottomColor} 0%, ${colors?.cellTopColor} 100%)`,
					boxShadow: isDone
						? 'inset 0 0 10px 0px #fff'
						: 'inset 0 0 10px 0px #000',
				}}
				onClick={handleClick}
				id={el.value?.toString()}
				disabled={solved}
			>
				{el.value}
			</button>
		</div>
	);
};
