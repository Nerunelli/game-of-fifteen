import { TRANSFORM_DURATION } from '../../consts';
import { images } from '../../images/images';
import { ICell } from '../../models';
import { countDelay } from '../../utils';

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
			className={'absolute z-50 inline-block h-1/4 w-1/4'}
			src={images[el.title || '16']}
			alt=""
		/>
	);
};
