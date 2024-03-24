import { TRANSFORM_DURATION } from '../../consts';
import { cellImages } from '../../images/cellImages';
import { ICell } from '../../types/cell';
import { countDelay } from '../../utils/flipCellHelpers';

interface IProps {
	el: ICell;
	solved: boolean;
	flipOrder: number;
}

export const PictureCell: React.FC<IProps> = ({ el, solved, flipOrder }) => {
	return (
		<img
			style={{
				top: `calc(${el.position.y * 25}%)`,
				left: `calc(${el.position.x * 25}%)`,
				transition: `transform ${TRANSFORM_DURATION}s ${
					TRANSFORM_DURATION + countDelay(flipOrder)
				}s`,
				transformStyle: 'preserve-3d',
				perspective: '1400px',
				transform: solved ? 'rotateY(360deg)' : 'rotateY(270deg)',
			}}
			className={'absolute z-50 inline-block size-1/4'}
			src={cellImages[el.value || '16']}
			alt=""
		/>
	);
};
