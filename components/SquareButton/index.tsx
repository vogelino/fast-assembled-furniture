import { HTMLProps, FC, CSSProperties, useContext } from 'react'
import { icons } from '@components/Icon'
import {
	squareButton,
	buttonContent,
	buttonContentContainer,
	textOnlyContainer,
	squareButtonActive,
} from './SquareButton.module.css'
import { getLuminance, meetsContrastGuidelines, readableColor } from 'polished'
import { ColorThemeContext } from '@components/ColorThemeContext'

enum TypeColorMap {
	Edit = '#FF9A6B',
	Add = '#FFEA61',
	Info = '#70B3FF',
	Buy = '#87E39D',
}
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	type: 'button' | 'submit' | 'reset'
	status?: string | number
	icon?: string
	colorType?: 'Edit' | 'Add' | 'Info' | 'Buy'
	style?: CSSProperties
	active?: boolean
}

export const Button: FC<ButtonProps> = ({
	children,
	className,
	icon,
	status = '',
	colorType,
	style = {},
	active = false,
	...rest
}) => {
	const { themeKey, themes } = useContext(ColorThemeContext)
	const IconTag = icon ? icons[icon] : () => null
	const isTextOnly = !icon && !status && children
	const theme = themes[themeKey]
	const typeColor = TypeColorMap[colorType || 'Edit']
	let { primary: textColor } = theme

	if (colorType && getLuminance(textColor) > 0.5) {
		textColor = theme.secondary
	}

	const contrastGuideLines = meetsContrastGuidelines(textColor, typeColor)

	if (colorType && !contrastGuideLines.AALarge) {
		textColor = readableColor(textColor)
	}

	return (
		// eslint-disable-next-line react/button-has-type
		<button
			className={`gf ${squareButton} ${className || ''} ${active ? squareButtonActive : ''}`}
			style={colorType ? { ...style, backgroundColor: typeColor } : style}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			<span
				className={`${buttonContentContainer} ${(isTextOnly && textOnlyContainer) || ''}`}
				style={{
					...(colorType
						? {
								color: textColor,
						  }
						: {}),
				}}
			>
				{icon && (
					<span style={{ gridArea: 'icon' }} className={`${buttonContent} icon`}>
						<IconTag size={20} />
					</span>
				)}
				{status}
				<span style={{ gridArea: 'text' }} className="text self-center justify-self-start">
					{children}
				</span>
			</span>
		</button>
	)
}
