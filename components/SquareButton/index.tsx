import { HTMLProps, FC } from 'react'
import { icons, IconType } from '@/components/Icon'
import { squareButton, buttonContent } from './SquareButton.module.css'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	primary?: boolean
	type: 'button' | 'submit' | 'reset'
	icon?: string
}

export const Button: FC<ButtonProps> = ({ children, className, icon, ...rest }) => {
	const IconTag = icon ? (icons[icon] as IconType) : () => null
	return (
		// eslint-disable-next-line react/button-has-type
		<button
			className={`gf ${squareButton} ${className}`}
			style={{
				gridTemplateAreas: `icon status
text text
`,
				gridTemplateColumns: '1fr 1fr',
				gridAutoRows: '1fr',
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
		>
			<span style={{ gridArea: 'icon' }} className={`${buttonContent} icon`}>
				{icon ? <IconTag size={20} /> : null}
			</span>
			<span style={{ gridArea: 'status' }} className={`${buttonContent} status`} />
			<span style={{ gridArea: 'text' }} className="text uppercase font-bold">
				{children}
			</span>
		</button>
	)
}
