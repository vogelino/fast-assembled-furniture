/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.tsx', './components/**/*.tsx'],
	theme: {
		colors: {
			primary: 'var(--primary)',
			primary50: 'var(--primary50)',
			primary20: 'var(--primary20)',
			secondary: 'var(--secondary)',
			secondary50: 'var(--secondary50)',
			secondary20: 'var(--secondary20)',
			semi: 'var(--semi)',
			semi50: 'var(--semi50)',
			semi20: 'var(--semi20)',
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
