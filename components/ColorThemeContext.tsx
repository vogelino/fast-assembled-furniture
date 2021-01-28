import { FC, createContext, useState, useEffect } from 'react'

type Theme = {
	[key: string]: string
}

type Themes = { [key: string]: Theme }

const themes: Themes = {
	light: { primary: '#000000', secondary: '#ffffff' },
	dark: { primary: '#f8f9fa', secondary: '#212529' },
	primaryGreen: { primary: '#00ab64', secondary: '#e7ffeb' },
	primaryBlue: { primary: '#1347e4', secondary: '#e5edf1' },
	primaryRed: { primary: '#f52937', secondary: '#ffebb6' },
}
interface ColorThemeContextType {
	themeKey: string
	theme: Theme
	setTheme: (theme: string) => void
	themes: Themes
}

const defaults = {
	themeKey: 'light',
	theme: themes.light,
	setTheme: () => undefined,
	themes,
}

export const ColorThemeContext = createContext<ColorThemeContextType>(defaults)

export const ColorThemeProvider: FC = ({ children }) => {
	const [themeKey, setTheme] = useState(defaults.themeKey)

	const selectTheme = (nextThemeKey: string) => {
		const nextTheme = themes[nextThemeKey]
		const nextThemeKeys: string[] = Object.keys(nextTheme)

		nextThemeKeys.forEach((k: string) => {
			document.documentElement.style.setProperty(`--${k}`, nextTheme[k])
		})

		setTheme(nextThemeKey)
	}

	useEffect(() => {
		selectTheme('light')
	}, [])

	return (
		<ColorThemeContext.Provider
			value={{ themeKey, theme: themes[themeKey], themes, setTheme: selectTheme }}
		>
			{children}
		</ColorThemeContext.Provider>
	)
}
