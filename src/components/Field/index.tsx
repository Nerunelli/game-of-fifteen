import { Cell } from '../Cell';
import { ICell, ICellPosition } from '../../types/cell';
import { CellStroke } from '../CellStroke';
import { PictureCell } from '../PictureCell';
import { useMemo } from 'react';
import { findFlipOrder } from '../../utils/flipCellHelpers';
import { IColors } from '../../types/colorSettings';

interface IProps {
	cells: ICell[];
	emptyCells: ICellPosition[];
	empty: ICellPosition;
	gameSolved: boolean;
	colors?: IColors;
	onCellClick: (cell: ICell) => void;
}

export const Field: React.FC<IProps> = ({
	cells,
	emptyCells,
	empty,
	gameSolved,
	colors,
	onCellClick,
}) => {
	const flipOrder = useMemo(() => Array.from(findFlipOrder(new Set())), []);

	return (
		<>
			<div className="z-0 size-80 rounded-field p-field">
				<div className="relative size-full">
					{emptyCells.map((el, i) => (
						<CellStroke
							flipOrder={flipOrder[i]}
							key={`empty-${i}`}
							solved={gameSolved}
							el={el}
							empty={empty}
						/>
					))}

					{cells.map((el, i) =>
						el.value ? (
							<Cell
								flipOrder={flipOrder[i]}
								solved={gameSolved}
								colors={colors}
								key={`cell-${el.value}`}
								el={el}
								onClick={onCellClick}
							/>
						) : null,
					)}

					{cells.map((el, i) => (
						<PictureCell
							solved={gameSolved}
							flipOrder={flipOrder[i]}
							key={`pic-${el.value}`}
							el={el}
						/>
					))}
				</div>
			</div>
		</>
	);
};
