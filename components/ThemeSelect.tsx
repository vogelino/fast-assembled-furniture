import { useContext, FC } from 'react'
import { ColorThemeContext } from './ColorThemeContext'

const ThemeSelect: FC = () => {
	const { themeKey: activeTheme, themes, setTheme } = useContext(ColorThemeContext)

	return (
		<>
			{Object.keys(themes).map((themeKey) => (
				// eslint-disable-next-line jsx-a11y/control-has-associated-label
				<button
					style={{
						borderWidth: 'var(--borderWidth, 3px)',
						borderColor: themes[themeKey].primary,
						backgroundColor: themes[themeKey][themeKey === activeTheme ? 'primary' : 'secondary'],
						boxShadow: `0 0 0 var(--borderWidth, 3px) ${themes[themeKey].secondary}`,
					}}
					className="w-4 h-4 bg-secondary rounded-full mx-auto my-2 ring-2 focus:outline-none focus:rounded-full"
					type="button"
					key={themeKey}
					onClick={(evt) => {
						evt.preventDefault()
						setTheme(themeKey)
					}}
				/>
			))}
		</>
	)
}

export default ThemeSelect
