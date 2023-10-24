import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FIELD_SIZE } from '../../consts';
import { Text } from '../Text';
import { ICell, ICellPosition, IColors } from '../../models';
import {
	isMoveable,
	findTargetCell,
	isSamePosition,
	isCorrectCoords,
	findOrder,
} from '../../utils';
import { ShuffleButton } from '../ShuffleButton';
import { Field } from '../Field';

interface IProps {
	colors?: IColors;
	shuffleCount?: number;
}

const matrix: ICell[] = [];
for (let y = 0; y < FIELD_SIZE; y++) {
	for (let x = 0; x < FIELD_SIZE; x++) {
		const number = x + FIELD_SIZE * y + 1;

		matrix.push({
			title: number !== 16 ? String(number) : '',
			position: { x, y },
		});
	}
}

export const Game: React.FC<IProps> = ({ colors, shuffleCount = 100 }) => {
	const [empty, setEmpty] = useState({ x: 3, y: 3 });
	const [forbidden, setForbidden] = useState('');
	const matrix: ICell[] = [];
	const emptyCells: ICellPosition[] = [];
	const moveCell = useRef<() => void>();
	const [shuffleClicked, setShuffleClicked] = useState(false);
	const [numberOfSolved, setNumberOfSolved] = useState(15);
	const [gameSolved, setGameSolved] = useState(false);

	for (let y = 0; y < FIELD_SIZE; y++) {
		for (let x = 0; x < FIELD_SIZE; x++) {
			const number = x + FIELD_SIZE * y + 1;

			emptyCells.push({ x, y });
			matrix.push({
				title: number !== 16 ? String(number) : '',
				position: { x, y },
			});
		}
	}
	const [cells, setCells] = useState([...matrix]);

	const handleCellClick = useCallback(
		(clicked: ICell) => {
			if (!isMoveable(clicked.position, empty)) {
				return;
			}
			const newPosition = empty;
			setEmpty(clicked.position);

			setCells((prev) => {
				const res = [...prev];
				const index = Number(clicked.title) - 1;

				res[index].position = newPosition;
				return res;
			});

			if (isCorrectCoords({ ...clicked, position: newPosition })) {
				setNumberOfSolved((prev) => prev + 1);
			} else if (isCorrectCoords(clicked)) {
				setNumberOfSolved((prev) => prev - 1);
			}
		},
		[cells, empty],
	);

	useEffect(() => {
		moveCell.current = () => {
			const target = findTargetCell(empty, forbidden);

			setForbidden(target.forbidden);
			setEmpty(target.position);

			const number = cells.findIndex((el) =>
				isSamePosition(el.position, target.position),
			);

			const cell = document.getElementById(String(number + 1));
			cell?.click();
		};
	}, [empty, forbidden]);

	const shuffle = useCallback(() => {
		let counter = 0;

		return (prevTimer?: NodeJS.Timeout) => {
			if (moveCell.current) {
				moveCell.current();
			}
			clearTimeout(prevTimer);
			if (counter === 0) {
				setShuffleClicked(true);
			}

			counter++;
			if (counter < shuffleCount) {
				const timer: NodeJS.Timeout = setTimeout(
					() => handleShuffle(timer),
					60,
				);
			} else {
				counter = 0;
			}
		};
	}, [moveCell, cells, shuffleCount]);

	const handleShuffle = useCallback(shuffle(), [shuffleCount]);

	useEffect(() => {
		if (shuffleClicked && numberOfSolved === 15) {
			setGameSolved(true);
		}
	}, [numberOfSolved, shuffleClicked]);

	return (
		<>
			{!shuffleClicked && (
				<div className="pb-8">
					<Text>Solve the puzzle</Text>
				</div>
			)}
			<Field
				cells={cells}
				emptyCells={emptyCells}
				empty={empty}
				gameSolved={gameSolved}
				colors={colors}
				onCellClick={handleCellClick}
			/>
			<div className="flex flex-col p-10">
				{!gameSolved ? (
					<ShuffleButton
						clicked={shuffleClicked}
						onClick={handleShuffle}
					></ShuffleButton>
				) : (
					<Text>Get your prize!</Text>
				)}
			</div>
		</>
	);
};
