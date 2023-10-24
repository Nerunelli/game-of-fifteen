import { Cell } from '../Cell';
import { ICell, ICellPosition, IColors } from '../../models';
import { CellContainer } from '../CellContainer';
import { PictureCell } from '../PictureCell';
import { useMemo } from 'react';
import { findOrder } from '../../utils';

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
	const flipOrder = useMemo(() => Array.from(findOrder(new Set())), []);

	return (
		<>
			<div
				style={{ background: colors?.field }}
				className="z-0 h-80 w-80 rounded-field bg-field-bg p-field shadow-field"
			>
				<div className="relative h-full w-full">
					{emptyCells.map((el, i) => (
						<CellContainer
							flipOrder={flipOrder[i]}
							key={`${i}-empty`}
							solved={gameSolved}
							el={el}
							empty={empty}
						/>
					))}

					{cells.map((el, i) =>
						el.title ? (
							<Cell
								flipOrder={flipOrder[i]}
								solved={gameSolved}
								colors={colors}
								key={el.title}
								el={el}
								onClick={onCellClick}
							/>
						) : null,
					)}

					{cells.map((el, i) => (
						<PictureCell
							solved={gameSolved}
							flipOrder={flipOrder[i]}
							key={`pic-${el.title}`}
							el={el}
						/>
					))}
				</div>
			</div>
		</>
	);
};
