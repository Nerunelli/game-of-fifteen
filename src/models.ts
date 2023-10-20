export interface ICell {
	title: string;
	position: ICellPosition;
}

export interface ICellPosition {
	x: number;
	y: number;
}

export interface IColors {
	background: string;
	field: string;
	cellTop: string;
	cellBottom: string;
}
