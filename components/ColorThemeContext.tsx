import { FC, createContext, useState, useEffect } from 'react'
import { ThemesType, ThemeType, themes } from '@utils/themeUtil'

type ColorThemeContextType = {
	themeKey: string
	nextThemeKey: string
	theme: ThemeType
	nextTheme: ThemeType
	setTheme: (theme: string) => void
	setNextTheme: (theme: string) => void
	themes: ThemesType
}

const defaults = {
	themeKey: 'light',
	nextThemeKey: 'dark',
	theme: themes.light,
	nextTheme: themes.dark,
	setTheme: () => undefined,
	setNextTheme: () => undefined,
	themes: themes,
}

export const ColorThemeContext = createContext<ColorThemeContextType>(defaults)

export const ColorThemeProvider: FC = ({ children }) => {
	const [themeKey, setTheme] = useState(defaults.themeKey)
	const themesKeys = Object.keys(themes)
	const activeThemeIdx = themesKeys.indexOf(themeKey)
	const nextThemeIdx = activeThemeIdx + 1 > themesKeys.length - 1 ? 0 : activeThemeIdx + 1
	const nextThemeKey = themesKeys[nextThemeIdx]

	const selectTheme = (targetThemeKey: string): void => {
		if (Object.keys(themes).length === 0) return
		const nextTheme = themes[targetThemeKey]
		const nextThemeKeys = Object.keys(nextTheme)

		nextThemeKeys.forEach((k) => {
			document.documentElement.style.setProperty(`--${k}`, nextTheme[k])
		})

		setTheme(targetThemeKey)
	}

	useEffect(() => {
		selectTheme('light')
	}, [])

	return (
		<ColorThemeContext.Provider
			value={{
				themeKey: themeKey,
				theme: themes[themeKey],
				nextTheme: themes[nextThemeKey],
				nextThemeKey,
				themes,
				setTheme: selectTheme,
				setNextTheme: () => selectTheme(nextThemeKey),
			}}
		>
			{children}
		</ColorThemeContext.Provider>
	)
}
