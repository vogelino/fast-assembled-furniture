import { HTMLProps, FC } from 'react'
import { icons, IconType } from '@/components/Icon'
import {
	squareButton,
	buttonContent,
	buttonContentContainer,
	textOnlyContainer,
} from './SquareButton.module.css'

enum TypeColorMap {
	Edit = '#FF9A6B',
	Add = '#FFEA61',
	Info = '#70B3FF',
	Buy = '#87E39D',
}
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	primary?: boolean
	type: 'button' | 'submit' | 'reset'
	status?: string | number
	icon?: string
	colorType?: 'Edit' | 'Add' | 'Info' | 'Buy'
}

export const Button: FC<ButtonProps> = ({
	children,
	className,
	icon,
	status = '',
	colorType,
	...rest
}) => {
	const IconTag = icon ? (icons[icon] as IconType) : () => null
	const isTextOnly = !icon && !status && children
	return (
		// eslint-disable-next-line react/button-has-type
		<button
			className={`gf ${squareButton} ${className} `}
			style={colorType ? { backgroundColor: TypeColorMap[colorType] } : {}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			<span className={`${buttonContentContainer} ${isTextOnly && textOnlyContainer}`}>
				{icon && (
					<span style={{ gridArea: 'icon' }} className={`${buttonContent} icon`}>
						<IconTag size={20} />
					</span>
				)}
				{status && (
					<span
						style={{ gridArea: 'status' }}
						className={`${buttonContent} justify-self-start status`}
					>
						{status}
					</span>
				)}
				<span style={{ gridArea: 'text' }} className="text self-center justify-self-start">
					{children}
				</span>
			</span>
		</button>
	)
}
