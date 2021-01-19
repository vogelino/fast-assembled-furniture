import { FC, useContext } from 'react'
import { Logo } from './Logo'
import { Button } from '../SquareButton'
import { ColorThemeContext } from '../ColorThemeContext'

const Header: FC = () => {
	const { themeKey: activeTheme, themes, setTheme } = useContext(ColorThemeContext)
	return (
		<>
			<header
				className="fixed top-0 left-0 w-16 h-full gfc grid z-50"
				style={{ gridTemplateRows: 'auto 1fr auto' }}
			>
				<Logo />
				<div className="gf flex flex-col pt-3">
					{Object.keys(themes).map((themeKey) => (
						// eslint-disable-next-line jsx-a11y/control-has-associated-label
						<button
							style={{
								borderWidth: 'var(--borderWidth, 3px)',
								borderColor: themes[themeKey].primary,
								backgroundColor:
									themes[themeKey][
										themeKey === activeTheme ? 'primary' : 'secondary'
									],
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
				</div>
				<Button type="button">x</Button>
			</header>
			<div
				className="gf fixed h-full pointer-events-none z-40"
				style={{
					top: 3,
					left: 64,
					bottom: 0,
					right: 0,
					background: 'none',
					boxShadow: '0 0 0 10px var(--primary)',
				}}
			/>
		</>
	)
}

export default Header
