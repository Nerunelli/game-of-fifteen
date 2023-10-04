import { ICell } from './components/Cell/models';

export const isMoveable = (el: ICell, empty: ICell) => {
	return el.x === empty.x || el.y === empty.y;
};
