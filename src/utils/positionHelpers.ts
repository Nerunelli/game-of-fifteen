import { ICellPosition } from '../types/cell';

/**
 * Check that the clicked cell is movable.
 *
 * @param cellPos - clicked cell position
 * @param emptyPos - empty cell position
 * @returns true if empty cell is adjacent to clicked cell
 */
export const isMovable = (cellPos: ICellPosition, emptyPos: ICellPosition) =>
	(cellPos.x === emptyPos.x && Math.abs(cellPos.y - emptyPos.y) === 1) ||
	(cellPos.y === emptyPos.y && Math.abs(cellPos.x - emptyPos.x) === 1);

/**
 * Check that the positions are the same.
 *
 * @param firstPos - first cell position
 * @param secondPos - second cell position
 * @returns true if positions are same
 */
export const isSamePosition = (
	firstPos: ICellPosition,
	secondPos: ICellPosition,
) => firstPos.x === secondPos.x && firstPos.y === secondPos.y;
