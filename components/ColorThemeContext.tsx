import { FC, createContext, useState, useEffect } from 'react'
import { ThemesType, ThemeType, themes, ThemeNameType, ThemePropType } from '@utils/themeUtil'

type ColorThemeContextType = {
	themeKey: ThemeNameType | undefined
	theme?: Partial<ThemeType>
	setTheme: (theme: ThemeNameType) => void
	themes?: Partial<ThemesType>
}

const defaults = {
	themeKey: 'light' as ThemeNameType,
	theme: themes.light as Partial<ThemeType>,
	setTheme: () => undefined,
	themes: themes as Partial<ThemesType>,
}

export const ColorThemeContext = createContext<ColorThemeContextType>(defaults)

export const ColorThemeProvider: FC = ({ children }) => {
	const [themeKey, setTheme] = useState(defaults.themeKey)

	const selectTheme = (nextThemeKey: ThemeNameType): void => {
		if (Object.keys(themes).length === 0) return
		const nextTheme = themes[nextThemeKey] as Partial<ThemeType>
		if (!nextTheme) return
		const nextThemeKeys = Object.keys(nextTheme) as ThemePropType[]

		nextThemeKeys.forEach((k) => {
			if (typeof k === 'string' && k in nextTheme) {
				document.documentElement.style.setProperty(`--${k}`, nextTheme[k] as string)
			}
		})

		setTheme(nextThemeKey)
	}

	useEffect(() => {
		selectTheme('light')
	}, [])

	return (
		<ColorThemeContext.Provider
			value={{
				themeKey: themeKey as ThemeNameType,
				theme: themes[themeKey as ThemeNameType] as Partial<ThemeType>,
				themes,
				setTheme: selectTheme,
			}}
		>
			{children}
		</ColorThemeContext.Provider>
	)
}
