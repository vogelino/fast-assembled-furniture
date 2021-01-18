import { FC } from 'react'
import { Logo } from './Logo'
import { Button } from '../SquareButton'

const Header: FC = () => (
	<>
		<header
			className="fixed top-0 left-0 w-16 h-screen gfc grid z-50"
			style={{ gridTemplateRows: 'auto 1fr auto' }}
		>
			<Logo />
			<div className="gf"></div>
			<Button type="button">x</Button>
		</header>
		<div
			className="gf fixed h-screen pointer-events-none z-40"
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

export default Header
