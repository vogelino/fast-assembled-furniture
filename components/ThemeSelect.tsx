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
					<span
						key={themeKey}
						className={['text-center', !isNext && !keepExpanded && 'hidden md:inline-block']
							.filter(Boolean)
							.join(' ')}
					>
						<button
							style={{
								borderColor: theme['primary'],
								backgroundColor: theme[isActive ? 'primary' : 'secondary'],
								boxShadow: `0 0 0 var(--borderWidth, 2px) ${theme['secondary']}`,
							}}
							className={[
								'inline-block',
								'w-4 h-4 bg-secondary rounded-full sm:my-2.5',
								'ring-2 focus:outline-none focus:rounded-full border-bd',
							]
								.filter(Boolean)
								.join(' ')}
							type="button"
							onClick={(evt) => {
								evt.preventDefault()
								setTheme(themeKey)
							}}
						/>
					</span>
				)
			})}
		</>
	)
}

export default ThemeSelect
