import { FC, createContext, useState, useEffect } from 'react'
import { ThemesType, ThemeType, themes } from '@utils/themeUtil'

type ColorThemeContextType = {
	themeKey: string
	theme: ThemeType
	setTheme: (theme: string) => void
	themes: ThemesType
}

const defaults = {
	themeKey: 'light',
	theme: themes.light,
	setTheme: () => undefined,
	themes: themes,
}

export const ColorThemeContext = createContext<ColorThemeContextType>(defaults)

export const ColorThemeProvider: FC = ({ children }) => {
	const [themeKey, setTheme] = useState(defaults.themeKey)

	const selectTheme = (nextThemeKey: string): void => {
		if (Object.keys(themes).length === 0) return
		const nextTheme = themes[nextThemeKey]
		const nextThemeKeys = Object.keys(nextTheme)

		nextThemeKeys.forEach((k) => {
			document.documentElement.style.setProperty(`--${k}`, nextTheme[k])
		})

		setTheme(nextThemeKey)
	}

	useEffect(() => {
		selectTheme('light')
	}, [])

	return (
		<ColorThemeContext.Provider
			value={{
				themeKey: themeKey,
				theme: themes[themeKey],
				themes,
				setTheme: selectTheme,
			}}
		>
			{children}
		</ColorThemeContext.Provider>
	)
}
