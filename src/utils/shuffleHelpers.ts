import { FIELD_SIZE } from '../consts';
import { ICellPosition } from '../types/cell';

/**
 * Find possible positions to move cell on shuffling.
 *
 * @param x - x coordinate
 * @param y - y coordinate
 * @param forbidden - forbidden direction to move cell
 * @returns array of possible coordinates to next move (+ change forbidden direction to prev position)
 */
export const findPossibleCells = (
	{ x, y }: ICellPosition,
	forbidden: string,
) => {
	const res: { position: ICellPosition; forbidden: string }[] = [];
	if (x < FIELD_SIZE - 1 && forbidden !== 'right') {
		res.push({ position: { x: x + 1, y }, forbidden: 'left' });
	}
	if (x > 0 && forbidden !== 'left') {
		res.push({ position: { x: x - 1, y }, forbidden: 'right' });
	}
	if (y < FIELD_SIZE - 1 && forbidden !== 'bottom') {
		res.push({ position: { x, y: y + 1 }, forbidden: 'top' });
	}
	if (y > 0 && forbidden !== 'top') {
		res.push({ position: { x, y: y - 1 }, forbidden: 'bottom' });
	}
	return res;
};

/**
 * Find target to move cell on shuffling.
 *
 * @param empty - empty cell position
 * @param forbidden - current forbidden direction to move cell
 * @returns choosen coordinates to move and new forbidden direction
 */
export const findTargetCell = (empty: ICellPosition, forbidden: string) => {
	const possibleCells = findPossibleCells(empty, forbidden);
	const random = Math.floor(Math.random() * possibleCells.length);
	const target = possibleCells[random];

	return target;
};
