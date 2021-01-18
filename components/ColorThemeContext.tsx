import { FC, createContext, useState } from 'react'

enum ColorSchemes {
	light = 'light',
	dark = 'dark',
	fancyA = 'fancyA',
}

interface ColorThemeContextType {
	theme: ColorSchemes
	setTheme: (theme: ColorSchemes) => void
}

export const ColorThemeContext = createContext<ColorThemeContextType>({
	theme: ColorSchemes.light,
	setTheme: () => undefined,
})

export const ColorThemeProvider: FC = ({ children }) => {
	const [theme, setTheme] = useState(ColorSchemes.light)

	return (
		<ColorThemeContext.Provider value={{ theme, setTheme }}>
			<body className={`theme theme-${theme}`}>{children}</body>
		</ColorThemeContext.Provider>
	)
}
