import { FC } from 'react'

export type IconType = FC<{ size?: number | undefined; color?: string | undefined }>

const X: IconType = ({ size = 24 }) => (
	<svg
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M18 6 6 18M6 6l12 12" />
	</svg>
)

const Menu: IconType = ({ size = 24 }) => (
	<svg
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M3 12h18M3 6h18M3 18h18" />
	</svg>
)

const MessageSquare: IconType = ({ size = 24 }) => (
	<svg
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
)

type IconsType = {
	[key: string]: IconType
}

export const icons: IconsType = {
	X,
	Menu,
	MessageSquare,
}
