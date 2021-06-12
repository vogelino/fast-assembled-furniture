import React, { FC, useContext } from 'react'
import { Button } from '@components/SquareButton'
import { Logo } from '@components/Logo'
import { CartContext } from '@components/CartContext'
import ThemeSelect from '@components/ThemeSelect'
import { MenuContext } from '@components/MenuContext'
import { HeaderMenu } from '@components/HeaderMenu'
import { HeaderMenuOverlay } from '@components/HeaderMenuOverlay'
import styles from './Header.module.css'
import { BorderEdge } from '@components/BorderEdge'

const Header: FC = () => {
	const { menuLinks, menuIsOpened, toggleMenu } = useContext(MenuContext)
	const [cart] = useContext(CartContext)

	return (
		<>
			<header
				className={[
					styles.container,
					!menuIsOpened && styles.containerClosed,
					'fixed top-0 left-0 w-16 h-full gfc grid z-50',
					'container sm:left-1/2 sm:transform sm:-translate-x-1/2',
					'sm:h-16 sm:w-full',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<Logo />
				<div className="gf flex flex-col sm:flex-row pt-3 relative justify-start items-start sm:pl-3">
					<ThemeSelect />
					<div
						className={[
							'transform absolute uppercase font-bold',
							'left-2 sm:left-48',
							'-bottom-2 sm:bottom-1/2 sm:translate-y-1/2',
							'-rotate-90 sm:rotate-0',
							'origin-top-left whitespace-nowrap',
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
					'fixed top-0 right-0 bottom-0 z-40 bg-none',
					menuIsOpened ? 'pointer-events-auto' : 'pointer-events-none',
				].join(' ')}
			>
				<div
					className={[
						menuIsOpened ? styles.menuContainerOpened : styles.menuContainerClosed,
						'container mx-auto relative w-full h-full-p grid gap-0 bg-none',
					].join(' ')}
				>
					<HeaderMenu />
					<HeaderMenuOverlay />
				</div>
			</div>
			<div className="fixed hidden sm:block top-0 left-1/2 transform -translate-x-1/2 container pointer-events-none h-2">
				<div className="relative w-full h-full">
					<BorderEdge
						orientation={'TopRight' as const}
						className="absolute top-0 left-bd transform -translate-x-full"
					/>
					<BorderEdge
						orientation={'TopLeft' as const}
						className="absolute top-0 right-bd transform translate-x-full"
					/>
				</div>
			</div>
		</>
	)
}

export default Header
