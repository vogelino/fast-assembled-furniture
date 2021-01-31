import { FC } from 'react'

const year = new Date().getFullYear()

export const Credits: FC = () => (
	<small className="opacity-50 block p-2">
		© {year} Fast Assembled Furniture
		<br />
		🌐 by{' '}
		<a
			href="https://vogelino.com"
			title="Portfolio of Lucas Vogel, creator of this website"
			className="underline hover:no-underline cursor-pointer p-2"
		>
			vogelino
		</a>
	</small>
)
