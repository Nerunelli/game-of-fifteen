import { TRANSFORM_DURATION } from '../../consts';
import { ICellPosition } from '../../types/cell';
import { countDelay } from '../../utils/flipCellHelpers';
import { isSamePosition } from '../../utils/positionHelpers';

interface IProps {
	empty: ICellPosition;
	el: ICellPosition;
	solved: boolean;
	flipOrder: number;
}

export const CellStroke: React.FC<IProps> = ({
	el,
	empty,
	solved,
	flipOrder,
}) => {
	const isEmpty = isSamePosition(el, empty);

	return (
		<div
			className="absolute z-30 inline-block size-1/4 p-cell"
			style={{
				top: `calc(${el.y * 25}%)`,
				left: `calc(${el.x * 25}%)`,
				transition: `transform ${TRANSFORM_DURATION}s ${countDelay(
					flipOrder,
				)}s`,
				transform: solved ? 'rotateY(90deg)' : undefined,
			}}
		>
			<div
				style={{
					boxShadow: isEmpty
						? '0 0 10px 0px #f00, inset 0 0 20px 0px #c900ba'
						: 'inset 0 0 20px 0px #c900ba',
				}}
				className="size-full cursor-default rounded-cell border-2 border-solid border-white"
			></div>
		</div>
	);
};
