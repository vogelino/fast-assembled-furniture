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
				const darkColor = theme['primary'] !== '#ffffff' ? theme['primary'] : theme['secondary']
				const isLightTheme = themeKey === 'light'
				const backgroundColor = isActive
					? isLightTheme
						? 'white'
						: darkColor
					: isLightTheme
					? 'white'
					: darkColor
				const borderColor = isActive ? darkColor : 'transparent'

				return (
					<span
						key={themeKey}
						className={['text-center', !isNext && !keepExpanded && 'hidden md:inline-block']
							.filter(Boolean)
							.join(' ')}
					>
						<button
							style={{
								borderColor: isLightTheme && !isActive ? 'black' : 'white',
								backgroundColor,
								boxShadow: `0 0 0 var(--borderWidth, 2px) ${borderColor}`,
							}}
							className={[
								'inline-block',
								'w-4 h-4 bg-secondary rounded-full sm:my-2.5',
								'focus:outline-none focus:rounded-full border-bd',
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
