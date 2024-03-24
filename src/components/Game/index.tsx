import { useCallback, useEffect, useRef, useState } from 'react';
import { FIELD_SIZE } from '../../consts';
import { Text } from '../Text';
import { ICell, ICellPosition } from '../../types/cell';
import { isMovable, isSamePosition } from '../../utils/positionHelpers';
import { ShuffleButton } from '../ShuffleButton';
import { Field } from '../Field';
import { isCorrectCoords } from '../../utils/correctCellsHelpers';
import { findTargetCell } from '../../utils/shuffleHelpers';
import { IColors } from '../../types/colorSettings';
import { prepareMatrix } from '../../utils/prepareMatrix';

interface IProps {
	colors?: IColors;
	shuffleCount?: number;
}

export const Game: React.FC<IProps> = ({ colors, shuffleCount = 100 }) => {
	const [emptyCell, setEmptyCell] = useState({ x: 3, y: 3 });
	const [isForbidden, setIsForbidden] = useState('');
	const [shuffleClicked, setShuffleClicked] = useState(false);
	const [numberOfSolved, setNumberOfSolved] = useState(15);
	const [gameSolved, setGameSolved] = useState(false);

	const emptyCells: ICellPosition[] = [];
	const moveCell = useRef<() => void>();

	for (let y = 0; y < FIELD_SIZE; y++) {
		for (let x = 0; x < FIELD_SIZE; x++) {
			emptyCells.push({ x, y });
		}
	}
	const [cells, setCells] = useState(prepareMatrix());

	const handleCellClick = useCallback(
		(clicked: ICell) => {
			if (!isMovable(clicked.position, emptyCell)) {
				return;
			}
			const newPosition = emptyCell;
			setEmptyCell(clicked.position);

			setCells((prev) => {
				const res = [...prev];
				const index = clicked.value! - 1;

				res[index].position = newPosition;
				return res;
			});

			if (isCorrectCoords({ ...clicked, position: newPosition })) {
				setNumberOfSolved((prev) => prev + 1);
			} else if (isCorrectCoords(clicked)) {
				setNumberOfSolved((prev) => prev - 1);
			}
		},
		[emptyCell],
	);

	const shuffle = useCallback(() => {
		let counter = 0;

		return function shuf(prevTimer?: NodeJS.Timeout) {
			if (moveCell.current) {
				moveCell.current();
			}
			clearTimeout(prevTimer);
			if (counter === 0) {
				setShuffleClicked(true);
			}

			counter++;
			if (counter < shuffleCount) {
				const timer: NodeJS.Timeout = setTimeout(() => shuf(timer), 60);
			} else {
				counter = 0;
			}
		};
	}, [moveCell, shuffleCount]);

	const handleShuffle = shuffle();

	useEffect(() => {
		moveCell.current = () => {
			const target = findTargetCell(emptyCell, isForbidden);

			setIsForbidden(target.forbidden);
			setEmptyCell(target.position);

			const number = cells.findIndex((el) =>
				isSamePosition(el.position, target.position),
			);

			const cell = document.getElementById(String(number + 1));
			cell?.click();
		};
	}, [cells, emptyCell, isForbidden]);

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
				empty={emptyCell}
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
