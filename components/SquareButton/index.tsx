import { HTMLProps, FC, CSSProperties, useContext } from 'react'
import { icons } from '@components/Icon'
import styles from './SquareButton.module.css'
import { ColorThemeContext } from '@components/ColorThemeContext'

const {
	squareButton,
	buttonContent,
	buttonContentContainer,
	textOnlyContainer,
	squareButtonActive,
	iconOnlyContainer,
} = styles
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	type: 'button' | 'submit' | 'reset'
	status?: string | number
	icon?: string
	primary?: boolean
	style?: CSSProperties
	active?: boolean
}

export const Button: FC<ButtonProps> = ({
	children,
	className,
	icon,
	status = '',
	style = {},
	primary = false,
	active = false,
	...rest
}) => {
	const { themeKey, themes } = useContext(ColorThemeContext)
	const IconTag = icon ? icons[icon] : () => null
	const isTextOnly = !icon && !status && children
	const isIconOnly = icon && !status && !children
	const theme = themes[themeKey]

	return (
		// eslint-disable-next-line react/button-has-type
		<button
			className={`gf ${squareButton} ${className || ''} ${active ? squareButtonActive : ''}`}
			style={primary ? { ...style, backgroundColor: theme.primary } : style}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			<span
				className={[
					buttonContentContainer,
					isTextOnly && textOnlyContainer,
					isIconOnly && iconOnlyContainer,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ ...(primary ? { color: theme.secondary } : {}) }}
			>
				{icon && (
					<span style={{ gridArea: 'icon' }} className={`${buttonContent} icon`}>
						<IconTag size={isIconOnly ? 32 : 20} />
					</span>
				)}
				{status}
				{children && (
					<span
						style={{ gridArea: 'text' }}
						className="text leading-5 self-center justify-self-start"
					>
						{children}
					</span>
				)}
			</span>
		</button>
	)
}
