/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				'container-bg': '#250B5F',
				'field-bg': '#0B0045',
			},
			colors: {
				cell: '#fccb2f',
				'dark-blue': '#12009A',
				violet: '#A606B2',
				'light-violet': '#b667e3',
				blue: '#68edff',
				black: '#000',
				transparent: 'transparent',
			},
			width: {
				128: '26rem',
			},
			height: {
				128: '26rem',
			},
			padding: {
				cell: '0.305rem',
				field: '0.7rem',
			},
			boxShadow: {
				field: '0 0 20px -8px #FFFFFF',
				'wrong-cell': 'inset 0 0 10px 0px #000000',
				'done-cell': 'inset 0 0 10px 0px #FFFFFF',
				'empty-cell': '0 0 10px 0px #FF0000, inset 0 0 20px 0px #C900BA',
				button: '0 0 12px 0px #d677f5, inset 0 0 18px 0px #a510d6',
				'button-hover': '0 0 12px 0px #68edff, inset 0 0 18px 0px #a510d6',
			},
			letterSpacing: {
				button: '.25em',
			},
			borderWidth: {
				'01': '0.1px',
			},
			borderRadius: {
				'field': '0.75rem',
				'cell': '0.35rem',
			}
		},
	},
	plugins: [],
};
