import React, { useEffect, useState } from 'react';
import { Field } from './components/Field';
import { Container } from './components/Container';

const inputs = ['background', 'field', 'cellTop', 'cellBottom'];

function App() {
	const [colors, setColors] = useState({
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

	useEffect(() => {
		console.log(colors);
	}, [colors]);

	return (
		<Container bg={colors.background}>
			<Field colors={colors} />
			<div className="flex p-10 flex-col">
				{Object.keys(colors).map((el: string) => {
					return (
						<div key={el} className="flex justify-between w-80">
							<span className="text-xl font-semibold text-white mr-3">
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
		</Container>
	);
}

export default App;
