import { FIELD_SIZE } from '../consts';
import { ICell } from '../types/cell';

/**
 * Check that cell in place.
 *
 * @param cell - cell
 * @returns true if cell has correct x and y
 */
export const isCorrectCoords = (cell: ICell) => {
	const { x, y } = cell.position;
	return cell.value === x + FIELD_SIZE * y + 1;
};

/**
 * Count correct cells.
 *
 * @param cells - array of all cells
 * @returns number of cells that are in place
 */
export const countCorrectCells = (cells: ICell[]) =>
	cells.reduce(
		(res, currCell) => (isCorrectCoords(currCell) ? res + 1 : res),
		0,
	);
