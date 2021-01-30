import { HTMLProps, FC, CSSProperties } from 'react'
import { icons, IconType } from '@components/Icon'
import {
	squareButton,
	buttonContent,
	buttonContentContainer,
	textOnlyContainer,
	squareButtonActive,
} from './SquareButton.module.css'

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
	const IconTag = icon ? (icons[icon] as IconType) : () => null
	const isTextOnly = !icon && !status && children
	return (
		// eslint-disable-next-line react/button-has-type
		<button
			className={`gf ${squareButton} ${className} ${active ? squareButtonActive : ''}`}
			style={colorType ? { ...style, backgroundColor: TypeColorMap[colorType] } : style}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			<span className={`${buttonContentContainer} ${isTextOnly && textOnlyContainer}`}>
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
