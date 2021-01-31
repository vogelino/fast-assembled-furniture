import { FC, useContext } from 'react'
import { Button } from '@components/SquareButton'
import { Logo } from '@components/Header/Logo'
import { CartContext } from '@components/CartContext'
import ThemeSelect from '@components/ThemeSelect'
import { MenuContext } from '@components/MenuContext'

export const MenuSidebar: FC = () => {
	const { menuLinks, menuIsOpened, toggleMenu } = useContext(MenuContext)
	const [cart] = useContext(CartContext)

	return (
		<header
			className="absolute top-0 left-0 w-16 h-full gfc grid z-50"
			style={{ gridTemplateRows: 'auto 1fr auto' }}
		>
			<Logo />
			<div className="gf flex flex-col pt-3 relative">
				<ThemeSelect />
				<div className="absolute transform left-2 -bottom-2 uppercase font-bold origin-top-left -rotate-90 whitespace-nowrap">
					{menuIsOpened
						? 'Menu'
						: menuLinks.filter(({ active }) => active).map(({ title }) => title)}
				</div>
			</div>
			<Button type="button" icon="ShoppingCart" status={Object.keys(cart).length}>
				Cart
			</Button>
			<Button type="button" icon={menuIsOpened ? 'X' : 'Menu'} onClick={toggleMenu}>
				{menuIsOpened ? 'Close' : 'Menu'}
			</Button>
		</header>
	)
}
