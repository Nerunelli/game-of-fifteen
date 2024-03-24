import { FIELD_SIZE } from '../consts';
import { ICell } from '../types/cell';

export const prepareMatrix = () => {
	const matrix: ICell[] = [];
	for (let y = 0; y < FIELD_SIZE; y++) {
		for (let x = 0; x < FIELD_SIZE; x++) {
			const number = x + FIELD_SIZE * y + 1;

			matrix.push({
				value: number !== 16 ? number : undefined,
				position: { x, y },
			});
		}
	}
	return matrix;
};
