import { HTMLProps, FC } from 'react'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
	primary?: boolean
	type: 'button' | 'submit' | 'reset'
}

export const Button: FC<ButtonProps> = ({ children, className, ...rest }) => (
	// eslint-disable-next-line react/button-has-type
	<button
		className={`gf w-16 h-16 ${className}`}
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...rest}
	>
		{children}
	</button>
)
