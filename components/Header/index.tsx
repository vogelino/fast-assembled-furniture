import { FC, useContext, useState } from 'react'
import { Button } from '@/components/SquareButton'
import { Logo } from './Logo'
import { CartContext } from '../CartContext'
import ThemeSelect from '../ThemeSelect'

const Header: FC = () => {
	const [menuIsOpened, setMenuIsOpened] = useState(false)
	const [cart] = useContext(CartContext)

	return (
		<>
			<header
				className="absolute top-0 left-0 w-16 h-full gfc grid z-50"
				style={{ gridTemplateRows: 'auto 1fr auto' }}
			>
				<Logo />
				<div className="gf flex flex-col pt-3">
					<ThemeSelect />
				</div>
				<Button type="button" icon="ShoppingCart" status={Object.keys(cart).length}>
					Cart
				</Button>
				<Button
					type="button"
					icon={menuIsOpened ? 'X' : 'Menu'}
					onClick={() => setMenuIsOpened(!menuIsOpened)}
				>
					{menuIsOpened ? 'Close' : 'Menu'}
				</Button>
			</header>
			<div
				className="gf absolute h-full pointer-events-none z-40"
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
}

export default Header
