import React, { FC, useContext } from 'react'
import { Button } from '@components/SquareButton'
import { Logo } from '@components/Logo'
import { CartContext } from '@components/CartContext'
import ThemeSelect from '@components/ThemeSelect'
import { MenuContext } from '@components/MenuContext'
import { HeaderMenu } from '@components/HeaderMenu'
import { HeaderMenuOverlay } from '@components/HeaderMenuOverlay'
import styles from './Header.module.css'

const Header: FC = () => {
	const { menuLinks, menuIsOpened, toggleMenu } = useContext(MenuContext)
	const [cart] = useContext(CartContext)

	return (
		<>
			<header
				className={[
					styles.container,
					'absolute top-0 left-0 w-16 h-full gfc grid z-50',
					'sm:h-16 sm:w-full',
				].join(' ')}
			>
				<Logo />
				<div className="gf flex flex-col sm:flex-row pt-3 relative justify-start items-start sm:pl-3">
					<ThemeSelect />
					<div
						className={[
							'transform left-2 -bottom-2 uppercase font-bold',
							'origin-top-left -rotate-90 sm:hidden whitespace-nowrap',
						].join(' ')}
					>
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
			<div
				className={[
					styles.menuWrapper,
					'absolute top-0 right-0 bottom-0 z-40 bg-none',
					menuIsOpened ? 'pointer-events-auto' : 'pointer-events-none',
				].join(' ')}
			>
				<div
					className={[
						menuIsOpened ? styles.menuContainerOpened : styles.menuContainerClosed,
						'relative w-full h-full-p grid gap-0 bg-none',
					].join(' ')}
				>
					<HeaderMenu />
					<HeaderMenuOverlay />
				</div>
			</div>
		</>
	)
}

export default Header
