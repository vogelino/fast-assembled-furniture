import { useContext, FC } from 'react'
import { ColorThemeContext } from './ColorThemeContext'

const ThemeSelect: FC = () => {
	const { themeKey: activeTheme, themes, setTheme } = useContext(ColorThemeContext)

	return (
		<>
			{Object.keys(themes).map((themeKey) => {
				const theme = themes[themeKey]

				return (
					<button
						style={{
							borderWidth: 'var(--borderWidth, 3px)',
							borderColor: theme['primary'],
							backgroundColor: theme[themeKey === activeTheme ? 'primary' : 'secondary'],
							boxShadow: `0 0 0 var(--borderWidth, 3px) ${theme['secondary']}`,
						}}
						className="w-4 h-4 bg-secondary rounded-full mx-auto sm:mx-2 my-2.5 ring-2 focus:outline-none focus:rounded-full"
						type="button"
						key={themeKey}
						onClick={(evt) => {
							evt.preventDefault()
							setTheme(themeKey)
						}}
					/>
				)
				return null
			})}
		</>
	)
}

export default ThemeSelect
