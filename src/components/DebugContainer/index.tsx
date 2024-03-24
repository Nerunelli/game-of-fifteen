import { IColors } from '../../types/colorSettings';

interface IProps {
	shuffleCount?: number;
	colors: IColors;
	setShuffleCount: React.Dispatch<React.SetStateAction<number | undefined>>;
	setColors: React.Dispatch<React.SetStateAction<IColors>>;
}

export const DebugContainer: React.FC<IProps> = ({
	shuffleCount,
	colors,
	setShuffleCount,
	setColors,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColors((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleShuffleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShuffleCount(
			!isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : undefined,
		);
	};

	return (
		<div className="absolute left-0 top-0 p-10">
			<div className="flex flex-col pb-6">
				{Object.keys(colors).map((colorPurpose: string) => {
					return (
						<div
							key={`color-item-${colorPurpose}`}
							className="flex w-80 justify-between"
						>
							<span className="mr-3 text-xl font-semibold text-white">
								{colorPurpose}
							</span>
							<div className="relative">
								<input
									className="absolute right-9 mr-colorInput"
									type="color"
									id={colorPurpose}
									value={colors[colorPurpose as keyof typeof colors]}
									onChange={handleChange}
								/>
								<span className="text-xl font-semibold text-white">
									{colors[colorPurpose as keyof typeof colors]}
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<span className="mr-3 text-xl font-semibold text-white">
				shuffle count
			</span>
			<input value={shuffleCount} onChange={handleShuffleCount} />
		</div>
	);
};
