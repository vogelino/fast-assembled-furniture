import { useContext, FC } from 'react'
import { ColorThemeContext } from './ColorThemeContext'

interface ThemeSelectPropType {
	keepExpanded?: boolean
}

const ThemeSelect: FC<ThemeSelectPropType> = ({ keepExpanded = false }) => {
	const { themeKey: activeTheme, nextThemeKey, themes, setTheme } = useContext(ColorThemeContext)

	return (
		<>
			{Object.keys(themes).map((themeKey) => {
				const theme = themes[themeKey]
				const isActive = themeKey === activeTheme
				const isNext = themeKey === nextThemeKey

				return (
					<button
						style={{
							borderWidth: 'var(--borderWidth, 3px)',
							borderColor: theme['primary'],
							backgroundColor: theme[isActive ? 'primary' : 'secondary'],
							boxShadow: `0 0 0 var(--borderWidth, 3px) ${theme['secondary']}`,
						}}
						className={[
							!isNext && !keepExpanded && 'hidden md:inline-block',
							'w-4 h-4 bg-secondary rounded-full my-1.5 sm:my-2.5',
							'ring-2 focus:outline-none focus:rounded-full',
						]
							.filter(Boolean)
							.join(' ')}
						type="button"
						key={themeKey}
						onClick={(evt) => {
							evt.preventDefault()
							setTheme(themeKey)
						}}
					/>
				)
			})}
		</>
	)
}

export default ThemeSelect
