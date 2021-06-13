import { FC, useContext, useEffect } from 'react'
import { Button } from '@components/SquareButton'
import Link from '@components/Link'
import { MenuContext } from '@components/MenuContext'
import styles from './HeaderMenu.module.css'
import { CartContext } from '@components/CartContext'
import { useRouter } from 'next/router'

const year = new Date().getFullYear()

const MenuFooter: FC = () => {
	const { secondaryLinks, closeMenu } = useContext(MenuContext)

	return (
		<li
			className={[
				'gf list-none w-full-p sm:w-auto h-full-fr p-4',
				'grid grid-flow-row sm:col-span-3 lg:col-span-1 lg:row-span-2',
			].join(' ')}
			style={{
				gridTemplateRows: '1fr auto auto',
			}}
		>
			<div className="sm:hidden" />
			<ul className="grid grid-flow-row-dense auto-rows-auto items-end pb-4">
				{secondaryLinks.map((secondaryLink) => (
					<li key={secondaryLink.path}>
						<Link
							href={secondaryLink.path}
							inactiveClassName="underline hover:no-underline cursor-pointer"
							onClick={closeMenu}
						>
							{secondaryLink.title}
						</Link>
					</li>
				))}
			</ul>
			<small className="opacity-50 block">
				© {year} Fast Assembled Furniture
				<br />
				🌐 by{' '}
				<a
					href="https://vogelino.com"
					title="Portfolio of Lucas Vogel, creator of this website"
					className="underline hover:no-underline cursor-pointer"
				>
					vogelino
				</a>
			</small>
		</li>
	)
}

export const HeaderMenu: FC = () => {
	const { locale } = useRouter()
	const { menuLinks, closeMenu, menuIsOpened } = useContext(MenuContext)
	const { cartSize, cartTotalPrice } = useContext(CartContext)

	const currency = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
	})

	useEffect(() => {
		const htmlElement = document.querySelector('html')
		if (!htmlElement) return
		if (menuIsOpened) htmlElement.classList.add('no-scroll')
		else htmlElement.classList.remove('no-scroll')
		return () => htmlElement.classList.remove('no-scroll')
	}, [menuIsOpened])

	return (
		<div
			className={[
				styles.container,
				menuIsOpened ? 'opacity-100' : 'opacity-0',
				'gfc h-full z-20 overflow-hidden relative',
			].join(' ')}
		>
			<div
				className={[
					styles.innerContainer,
					cartSize !== 0 ? styles.innerContainerWithCart : styles.innerContainerWithoutCart,
					'grid grid-flow-row w-full h-full',
				].join(' ')}
			>
				<div
					className={[
						'overflow-y-auto overflow-x-hidden border-bd rounded-lg',
						'-mt-bd sm:ml-0 w-full sm:w-full sm:border-b-0 border-b-0',
					].join(' ')}
				>
					<ul
						className={[styles.linksParent, 'inline-grid grid-flow-row w-full-p sm:grid'].join(' ')}
						style={{
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							'--linksCount': `${menuLinks.length}`,
						}}
					>
						{menuLinks.map((menuLink) => (
							<li
								key={menuLink.path}
								className={[
									'gf list-none p-4 uppercase text-2xl grid items-center',
									'leading-6 flex-grow',
									menuLink.active
										? 'line-through'
										: 'font-bold cursor-pointer hover:opacity-50 transition-opacity',
								].join(' ')}
							>
								<Link href={menuLink.path} onClick={closeMenu}>
									{menuLink.title}
								</Link>
							</li>
						))}
						{cartSize !== 0 ? (
							<li className="hidden sm:grid">
								<Button type="button" colorType="Buy" className="w-full-p">
									Checkout{' '}
									<span className="inline-block text-sm font-normal">
										({currency.format(cartTotalPrice)})
									</span>
								</Button>
							</li>
						) : (
							<li className="gf hidden sm:block" />
						)}
						<MenuFooter />
					</ul>
				</div>
				{cartSize !== 0 && (
					<div className="sm:hidden gfc -mt-bd w-full">
						<Button type="button" colorType="Buy" className="w-full-p">
							Checkout{' '}
							<span className="inline-block text-sm font-normal">
								({currency.format(cartTotalPrice)})
							</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
