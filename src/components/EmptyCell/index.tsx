import { ICell } from './models';

interface IProps {
	el: ICell;
}

export const EmptyCell: React.FC<IProps> = ({ el }) => {
	return (
		<div
			className="inline-block w-1/4 h-1/4 p-cell absolute"
			style={{
				top: `calc(${el.y * 25}%)`,
				left: `calc(${el.x * 25}%)`,
			}}
		>
			<button className="w-full h-full cursor-default border-solid border-2 border-white shadow-empty-cell rounded-md"></button>
		</div>
	);
};
