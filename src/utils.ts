import { FIELD_SIZE } from './consts';
import { ICell, ICellPosition } from './models';

export const isMoveable = (el: ICellPosition, empty: ICellPosition) => {
	return (
		(el.x === empty.x && Math.abs(el.y - empty.y) === 1) ||
		(el.y === empty.y && Math.abs(el.x - empty.x) === 1)
	);
};

export const isSamePosition = (el: ICellPosition, empty: ICellPosition) => {
	return el.x === empty.x && el.y === empty.y;
};

export const isCorrectCoords = (el: ICell) => {
	const { x, y } = el.position;
	return el.title === String(x + FIELD_SIZE * y + 1);
};

export const countCorrect = (cells: ICell[]) => {
	let res = 0;
	cells.forEach((el) => {
		if (isCorrectCoords(el)) {
			res++;
		}
	});
	return res;
};

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

export const findTargetCell = (empty: ICellPosition, forbidden: string) => {
	const possibleCells = findPossibleCells(empty, forbidden);
	const random = Math.floor(Math.random() * possibleCells.length);
	const target = possibleCells[random];

	return target;
};

export const findOrder = (set: Set<number>) => {
	const newNumber = Math.floor(Math.random() * 16);
	set.add(newNumber);

	if (set.size < FIELD_SIZE ** 2) {
		findOrder(set);
	}
	return set;
};

export const countDelay = (num: number) => {
	return num / 6 + 1;
};
