module.exports = {
	purge: [
		'./pages/**/*.tsx',
		'./pages/**/*.ts',
		'./components/**/*.tsx',
		'./components/**/*.ts',
		'./utils/**/*.ts',
		'./utils/**/*.tsx',
	],
	darkMode: false,
	theme: {
		colors: {
			primary: 'var(--primary)',
			primary50: 'var(--primary50)',
			primary20: 'var(--primary20)',
			secondary: 'var(--secondary)',
			secondary50: 'var(--secondary50)',
			secondary20: 'var(--secondary20)',
		},
		extend: {
			fontFamily: {
				sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
			},
			borderWidth: {
				'bd': 'var(--borderWidth, 3px)',
			},
			spacing: {
				'bd': 'var(--borderWidth, 3px)'
			},
			width: {
				'full-p': 'calc(100% + var(--borderWidth, 3px))',
				'50-p': 'calc(50% + var(--borderWidth, 3px))',
				'full-fr': 'calc(1fr + var(--borderWidth, 3px))',
			},
			height: {
				'full-p': 'calc(100% + var(--borderWidth, 3px))',
				'full-fr': 'calc(1fr + var(--borderWidth, 3px))',
			},
		}
	},
	variants: {
		extend: {
			ringWidth: ['group-focus']
		},
	},
	plugins: [],
}
