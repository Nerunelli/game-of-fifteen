import { FIELD_SIZE } from '../consts';

/**
 * Find order to flip cells.
 *
 * @param set - set of cells ids
 * @returns set of cells ids - order of flipping cells
 */
export const findFlipOrder = (set: Set<number>) => {
	const newNumber = Math.floor(Math.random() * 16);
	set.add(newNumber);

	if (set.size < FIELD_SIZE ** 2) {
		findFlipOrder(set);
	}
	return set;
};

/**
 * Find delay for cell flip.
 *
 * @param num - num of cell in list
 * @returns delay
 */
export const countDelay = (num: number) => {
	return num / 6 + 1;
};
