import { transparentize } from 'polished'

export type ThemeType = {
	[key: string]: string
}

export type ThemesType = {
	[key: string]: ThemeType
}

function createThemeVariant(rawTheme: ThemeType): ThemeType {
	return Object.keys(rawTheme).reduce(
		(acc, themeProp) => ({
			...(acc || {}),
			[`${themeProp}50`]: transparentize(0.5, rawTheme[themeProp]),
			[`${themeProp}20`]: transparentize(0.8, rawTheme[themeProp]),
		}),
		rawTheme
	)
}

function createThemesWithVariants(rawThemes: ThemesType): ThemesType {
	return Object.keys(rawThemes).reduce(
		(acc, rawThemeKey) => ({
			...acc,
			[rawThemeKey]: createThemeVariant(rawThemes[rawThemeKey]),
		}),
		{}
	)
}

export const themes: ThemesType = createThemesWithVariants({
	light: { primary: '#000000', secondary: '#ffffff' },
	dark: { primary: '#f8f9fa', secondary: '#212529' },
	primaryGreen: { primary: '#00ab64', secondary: '#e7ffeb' },
	primaryBlue: { primary: '#1347e4', secondary: '#e5edf1' },
	primaryRed: { primary: '#f52937', secondary: '#ffebb6' },
})

export function isDarkTheme(themeKey: string): boolean {
	return themeKey.toLowerCase().includes('dark')
}
