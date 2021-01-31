import React, { FC, useContext } from 'react'
import { Button } from '@components/SquareButton'
import { Logo } from '@components/Header/Logo'
import { CartContext } from '@components/CartContext'
import ThemeSelect, { ThemeSwitcher } from '@components/ThemeSelect'
import { MenuContext } from '@components/MenuContext'
import { useBoundingClientRect } from '@utils/hooks/useBoundingClientRect'

export const MenuSidebar: FC = () => {
	const { ref, height } = useBoundingClientRect()
	const { menuLinks, cartIsOpened, menuIsOpened, toggleMenu, toggleCart } = useContext(MenuContext)
	const { cartSize } = useContext(CartContext)
	let menuTitle = menuLinks.filter(({ active }) => active).map(({ title }) => title)[0] || ''
	if (menuIsOpened) menuTitle = 'Menu'
	if (cartIsOpened) menuTitle = 'Cart'

	console.log(height)
	return (
		<header
			className="absolute top-0 left-0 w-16 h-full gfc grid z-50"
			style={{ gridTemplateRows: 'auto 1fr auto' }}
		>
			<Logo />
			<div className="gf flex flex-col pt-3 relative" ref={ref}>
				{height && height < 400 ? <ThemeSwitcher /> : <ThemeSelect />}
				<div className="absolute transform left-2 -bottom-2 uppercase font-bold origin-top-left -rotate-90 whitespace-nowrap">
					{menuTitle}
				</div>
			</div>
			<Button
				type="button"
				icon={cartIsOpened ? 'X' : 'ShoppingCart'}
				status={cartSize}
				onClick={toggleCart}
				active={cartIsOpened}
			>
				{cartIsOpened ? 'Close' : 'Cart'}
			</Button>
			<Button
				type="button"
				icon={menuIsOpened ? 'X' : 'Menu'}
				onClick={toggleMenu}
				active={menuIsOpened}
			>
				{menuIsOpened ? 'Close' : 'Menu'}
			</Button>
		</header>
	)
}
