import { transparentize, mix } from 'polished'

export type ThemeType = {
	[key: string]: string
}

export type ThemesType = {
	[key: string]: ThemeType
}

function createThemeVariant(rawTheme: ThemeType): ThemeType {
	const extendedRawTheme: {
		[key: string]: string
		semi: string
	} = { ...rawTheme, semi: mix(0.5, rawTheme.secondary, rawTheme.primary) }
	return Object.keys(extendedRawTheme).reduce(
		(acc, themeProp) => ({
			...(acc || {}),
			[`${themeProp}50`]: transparentize(0.5, extendedRawTheme[themeProp]),
			[`${themeProp}20`]: transparentize(0.8, extendedRawTheme[themeProp]),
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
	/* eslint-disable prettier/prettier */
	light: { primary: '#000000', secondary: '#ffffff' },
	dark: { primary: '#ffffff', secondary: '#212529' },
	blau: { primary: '#ffffff', secondary: '#294eb6' },
	rosa: { primary: '#ffffff', secondary: '#fbb0db' },
	silber: { primary: '#ffffff', secondary: '#b3b3c2' },
	gelb: { primary: '#ffffff', secondary: '#f3c50d' },
	orange: { primary: '#f7732f', secondary: '#ffffff' },
	vlieder: { primary: '#ffffff', secondary: '#cfbcf5' },
	rot: { primary: '#e8213d', secondary: '#ffffff' },
	beige: { primary: '#ffffff', secondary: '#ddc6b9' },
	olive: { primary: '#756c52', secondary: '#ffffff' },
})
