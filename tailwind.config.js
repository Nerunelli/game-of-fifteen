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
				'cell': '#fccb2f',
				'dark-blue': '#12009A',
				'violet': '#A606B2',
			},
			width: {
        '128': '26rem',
      },
			height: {
        '128': '26rem',
      },
			padding: {
				'cell': '0.4rem',
				'field': '0.95rem',
			},
			boxShadow: {
        'field': '0 0 20px -8px #FFFFFF',
        'wrong-cell': 'inset 0 0 10px 0px #000000',
        'done-cell': 'inset 0 0 10px 0px #FFFFFF',
				'empty-cell': '0 0 10px 0px #FF0000, inset 0 0 20px 0px #C900BA',
      }
		},
	},
	plugins: [],
};
