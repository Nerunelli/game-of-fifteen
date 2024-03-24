import React, { useCallback, useEffect, useState } from 'react';
import { Game } from './components/Game';
import { DebugContainer } from './components/DebugContainer';
import { IColors } from './types/colorSettings';

export const App = () => {
	const [debugMode, setDebugMode] = useState(false);
	const [shuffleCount, setShuffleCount] = useState<number | undefined>();
	const [colors, setColors] = useState<IColors>({
		backgroundColor: '#0E0227',
		cellTopColor: '#12009a',
		cellBottomColor: '#a606b2',
	});

	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.code === 'KeyD') {
			e.preventDefault();
			setDebugMode((prev) => !prev);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<div
			style={{ background: colors.backgroundColor }}
			className="flex h-screen w-screen flex-col items-center justify-center bg-container-bg"
		>
			<Game colors={colors} shuffleCount={shuffleCount} />
			{debugMode && (
				<DebugContainer
					shuffleCount={shuffleCount}
					colors={colors}
					setShuffleCount={setShuffleCount}
					setColors={setColors}
				/>
			)}
		</div>
	);
};
