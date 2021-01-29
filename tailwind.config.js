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
			secondary: 'var(--secondary)',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
