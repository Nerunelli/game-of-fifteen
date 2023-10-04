import { FIELD_SIZE } from '../../consts';
import { Cell } from '../Cell';
import { ICell } from '../Cell/models';
import { EmptyCell } from '../EmptyCell';

interface IProps {
	colors: { [a: string]: string };
}

export const Field: React.FC<IProps> = ({ colors }) => {
	const cells = Array(FIELD_SIZE ** 2 - 1)
		.fill(0)
		.map((_el, i) => i + 1);
	cells.push(0);

	const matrix: ICell[] = [];
	for (let y = 0; y < FIELD_SIZE; y++) {
		for (let x = 0; x < FIELD_SIZE; x++) {
			const number = cells[x + FIELD_SIZE * y];
			console.log(y, x, number);

			matrix.push({
				title: number !== 0 ? String(number) : '',
				x,
				y,
			});
		}
	}

	return (
		<div
			style={{ background: colors.field }}
			className="w-128 h-128 bg-field-bg rounded-2xl p-field shadow-field"
		>
			<div className="w-full h-full relative">
				{matrix.map((el) =>
					el.title ? (
						<Cell
							colors={colors}
							key={el.title}
							el={el}
							empty={matrix[15]}
						></Cell>
					) : null,
				)}
				<EmptyCell el={matrix[15]}></EmptyCell>
			</div>
		</div>
	);
};
