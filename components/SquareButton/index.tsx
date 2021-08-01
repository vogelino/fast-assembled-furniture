import { HTMLProps, FC, CSSProperties, useContext } from 'react'
import { icons } from '@components/Icon'
import styles from './SquareButton.module.css'
import { ColorThemeContext } from '@components/ColorThemeContext'

const {
	squareButton,
	buttonContentContainer,
	textOnlyContainer,
	iconOnlyContainer,
	squareButtonTab,
	squareButtonActiveTab,
} = styles
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	type: 'button' | 'submit' | 'reset'
	status?: string | number
	icon?: string
	primary?: boolean
	style?: CSSProperties
	active?: boolean
	asTab?: boolean
}

export const Button: FC<ButtonProps> = ({
	children,
	className,
	icon,
	status = '',
	style = {},
	primary = false,
	active = false,
	asTab = false,
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
			className={[
				`gf grid focus:outline-none`,
				!asTab && 'focus:ring-inset focus:ring-4 focus:ring-primary20',
				squareButton,
				className,
				active && 'bg-primary text-secondary cursor-default',
				asTab && squareButtonTab,
				asTab && !primary && squareButtonActiveTab,
			]
				.filter(Boolean)
				.join(' ')}
			style={primary ? { ...style, backgroundColor: theme.primary } : style}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			<span
				className={[
					'grid w-full place-items-center p-1.5 rounded-md uppercase',
					'font-bold text-left text-sm transition-transform',
					buttonContentContainer,
					isTextOnly && textOnlyContainer,
					isIconOnly && iconOnlyContainer,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ ...(primary ? { color: theme.secondary } : {}) }}
			>
				{icon && (
					<span
						style={{ gridArea: 'icon' }}
						className="flex content-start place-items-center place-content-center w-full h-full icon"
					>
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
