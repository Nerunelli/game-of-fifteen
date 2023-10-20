import { TRANSFORM_DURATION } from '../../consts';
import { ICellPosition } from '../../models';
import { countDelay, isSamePosition } from '../../utils';

interface IProps {
	empty: ICellPosition;
	el: ICellPosition;
	solved: boolean;
	flipOrder: number;
}

export const CellContainer: React.FC<IProps> = ({
	el,
	empty,
	solved,
	flipOrder,
}) => {
	const isEmpty = isSamePosition(el, empty);

	return (
		<div
			className="absolute z-30 inline-block h-1/4 w-1/4 p-cell"
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
						? '0 0 10px 0px #FF0000, inset 0 0 20px 0px #C900BA'
						: 'inset 0 0 20px 0px #C900BA',
				}}
				className="h-full w-full cursor-default rounded-cell border-2 border-solid border-white"
			></div>
		</div>
	);
};
