import { transparentize, mix } from 'polished'

type RawThemeType = {
	primary: string
	secondary: string
}

export type ThemeType = {
	primary: string
	primary50: string
	primary20: string
	secondary: string
	secondary50: string
	secondary20: string
	semi: string
	semi50: string
	semi20: string
}

export type ThemesType = {
	light: ThemesType
	dark: ThemesType
	primaryGreen: ThemesType
	primaryBlue: ThemesType
	primaryRed: ThemesType
}

type RawThemesType = {
	light: RawThemeType
	dark: RawThemeType
	primaryGreen: RawThemeType
	primaryBlue: RawThemeType
	primaryRed: RawThemeType
}

type RawThemePropType = keyof RawThemeType
type RawThemeNameType = keyof RawThemesType
export type ThemePropType = keyof ThemeType
export type ThemeNameType = keyof ThemesType

function createThemeVariant(rawTheme: RawThemeType): Partial<ThemeType> {
	const extendedRawTheme = { ...rawTheme, semi: mix(0.5, rawTheme.secondary, rawTheme.primary) }
	return (Object.keys(extendedRawTheme) as RawThemePropType[]).reduce(
		(acc, themeProp) => ({
			...(acc || {}),
			[themeProp]: extendedRawTheme[themeProp],
			[`${themeProp}50`]: transparentize(0.5, extendedRawTheme[themeProp]),
			[`${themeProp}20`]: transparentize(0.8, extendedRawTheme[themeProp]),
		}),
		{}
	)
}

function createThemesWithVariants(rawThemes: RawThemesType): Partial<ThemesType> {
	return (Object.keys(rawThemes) as RawThemeNameType[]).reduce(
		(acc, rawThemeKey) => ({
			...acc,
			[rawThemeKey]: createThemeVariant(rawThemes[rawThemeKey]),
		}),
		{}
	)
}

export const themes: Partial<ThemesType> = createThemesWithVariants({
	light: { primary: '#000000', secondary: '#ffffff' },
	dark: { primary: '#f8f9fa', secondary: '#212529' },
	primaryGreen: { primary: '#00ab64', secondary: '#e7ffeb' },
	primaryBlue: { primary: '#1347e4', secondary: '#e5edf1' },
	primaryRed: { primary: '#f52937', secondary: '#ffebb6' },
})
