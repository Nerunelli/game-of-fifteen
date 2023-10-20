import React, { useEffect, useState } from 'react';
import { Game } from './components/Game';
import { Container } from './components/Container';
import { IColors } from './models';

function App() {
	const [develop, setDevelop] = useState(false);

	const handleKeyPress = (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.code === 'KeyD') {
			e.preventDefault();
			setDevelop((prev) => !prev);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	const [colors, setColors] = useState<IColors>({
		background: '#250B5F',
		field: '#0B0045',
		cellTop: '#12009A',
		cellBottom: '#A606B2',
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColors((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	const [shuffleCount, setShuffleCount] = useState<number | undefined>();

	return (
		<Container bg={colors.background}>
			<Game colors={colors} shuffleCount={shuffleCount} />
			{develop && (
				<div className="absolute left-0 top-0 p-10">
					<div className="flex flex-col pb-6">
						{Object.keys(colors).map((el: string) => {
							return (
								<div key={el} className="flex w-80 justify-between">
									<span className="mr-3 text-xl font-semibold text-white">
										{el}
									</span>
									<div className="relative">
										<input
											style={{ marginRight: '60px' }}
											className="absolute right-9"
											type="color"
											id={el}
											value={colors[el as keyof typeof colors]}
											onChange={onChange}
										/>
										<span className="text-xl font-semibold text-white">
											{colors[el as keyof typeof colors]}
										</span>
									</div>
								</div>
							);
						})}
					</div>
					<span className="mr-3 text-xl font-semibold text-white">
						shuffle count
					</span>
					<input
						value={shuffleCount}
						onChange={(e) =>
							setShuffleCount(
								!isNaN(Number(e.target.value))
									? Number(e.target.value)
									: undefined,
							)
						}
					/>
				</div>
			)}
		</Container>
	);
}

export default App;
