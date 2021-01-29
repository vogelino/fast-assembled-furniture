import { ThemeNameType } from '@utils/themeUtil'
import { useContext, FC } from 'react'
import { ColorThemeContext } from './ColorThemeContext'

const ThemeSelect: FC = () => {
	const { themeKey: activeTheme, themes, setTheme } = useContext(ColorThemeContext)
	const allThemes = themes || {}

	return (
		<>
			{(Object.keys(allThemes) as ThemeNameType[]).map((themeKey) => {
				if (!themes || themeKey === undefined) return null

				const theme = themes[themeKey] || {}

				if ('primary' in theme && 'secondary' in theme) {
					return (
						<button
							style={{
								borderWidth: 'var(--borderWidth, 3px)',
								borderColor: theme['primary'],
								backgroundColor: theme[themeKey === activeTheme ? 'primary' : 'secondary'],
								boxShadow: `0 0 0 var(--borderWidth, 3px) ${theme['secondary']}`,
							}}
							className="w-4 h-4 bg-secondary rounded-full mx-auto my-2 ring-2 focus:outline-none focus:rounded-full"
							type="button"
							key={themeKey}
							onClick={(evt) => {
								evt.preventDefault()
								setTheme(themeKey || 'light')
							}}
						/>
					)
				}
				return null
			})}
		</>
	)
}

export default ThemeSelect
