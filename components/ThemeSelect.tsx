import { useContext, FC } from 'react'
import { ColorThemeContext } from '@components/ColorThemeContext'
import { ThemeType } from '@utils/themeUtil'

type ThemePillPropType = {
	theme: ThemeType
	onClick: () => void
	isActive?: boolean
}

const ThemePill: FC<ThemePillPropType> = ({
	onClick,
	isActive = false,
	theme: { primary, secondary },
}) => (
	<button
		style={{
			borderWidth: 'var(--borderWidth, 3px)',
			borderColor: primary,
			backgroundColor: isActive ? primary : secondary,
			boxShadow: `0 0 0 var(--borderWidth, 3px) ${secondary}`,
		}}
		className="w-4 h-4 bg-secondary rounded-full mx-auto my-2 ring-2 focus:outline-none focus:rounded-full hover:opacity-50 transition-opacity"
		type="button"
		onClick={(evt) => {
			evt.preventDefault()
			onClick()
		}}
	/>
)

const ThemeSelect: FC = () => {
	const { themeKey: activeTheme, themes, setTheme } = useContext(ColorThemeContext)

	return (
		<>
			{Object.keys(themes).map((themeKey) => {
				const theme = themes[themeKey]

				return (
					<ThemePill
						key={themeKey}
						isActive={activeTheme === themeKey}
						onClick={() => setTheme(themeKey)}
						theme={theme}
					/>
				)
				return null
			})}
		</>
	)
}

export const ThemeSwitcher: FC = () => {
	const { themeKey: activeTheme, themes, setTheme } = useContext(ColorThemeContext)
	const themeKeysArray = Object.keys(themes)
	const themeIdx = themeKeysArray.findIndex((th) => th === activeTheme)
	const nextThemeIdx = themeIdx + 1 >= themeKeysArray.length ? 0 : themeIdx + 1
	const theme = themes[themeKeysArray[nextThemeIdx]]

	return <ThemePill onClick={() => setTheme(themeKeysArray[nextThemeIdx])} theme={theme} />
}

export default ThemeSelect
