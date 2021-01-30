import React, { FC, useContext } from 'react'
import { Button } from '@components/SquareButton'
import { Logo } from '@components/Header/Logo'
import { CartContext } from '@components/CartContext'
import ThemeSelect from '@components/ThemeSelect'
import { MenuContext } from '@components/MenuContext'
import Link from '@components/Link'

const year = new Date().getFullYear()

const Header: FC = () => {
	const { menuLinks, secondaryLinks, menuIsOpened, toggleMenu, closeMenu } = useContext(MenuContext)
	const [cart] = useContext(CartContext)

	return (
		<>
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
			<div
				className="top-0 right-0 bottom-0 absolute  z-40"
				style={{
					background: 'none',
					left: 64,
					boxShadow: '0 0 0 10px var(--primary)',
					pointerEvents: menuIsOpened ? 'all' : 'none',
				}}
			>
				<div
					className="relative w-full h-full-p grid gap-0"
					style={{
						gridTemplateColumns: menuIsOpened ? '256px 1fr' : '0px 1fr',
						background: 'none',
					}}
				>
					<div className="gfc h-full z-10 overflow-hidden relative" style={{ paddingLeft: 0 }}>
						<div
							className="absolute grid grid-flow-row w-full h-full"
							style={{
								minWidth: 256,
								top: 3,
								left: 0,
								gridTemplateRows: '1fr 67px',
							}}
						>
							<div className="overflow-y-auto border-bd rounded-lg -mt-bd -ml-bd w-full-p">
								<ul
									className="inline-grid grid-flow-row w-full-p"
									style={{
										gridTemplateRows: `repeat(${menuLinks.length}, auto) 1fr`,
										minHeight: 'calc(100% + var(--borderWidth, 3px))',
									}}
								>
									{menuLinks.map((menuLink) => (
										<li
											key={menuLink.path}
											className={`gf list-none p-4 uppercase text-2xl ${
												menuLink.active
													? 'line-through'
													: 'font-bold cursor-pointer hover:opacity-50 transition-opacity'
											}`}
										>
											<Link href={menuLink.path} onClick={closeMenu}>
												{menuLink.title}
											</Link>
										</li>
									))}
									<li
										className="gf list-none w-full-p h-full-fr p-4 grid grid-flow-row gap-4"
										style={{
											gridTemplateRows: '1fr auto auto',
										}}
									>
										<div />
										<ul className="grid grid-flow-row-dense auto-rows-auto items-end">
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
								</ul>
							</div>
							<Button type="button" colorType="Buy" className="w-full-p">
								Checkout <span className="inline-block text-sm font-normal">(599€)</span>
							</Button>
						</div>
					</div>
					<div
						className="gfc h-full z-0 relative"
						style={{
							paddingLeft: 0,
							background: 'none',
						}}
						onClick={closeMenu}
						onKeyPress={closeMenu}
						role="button"
						tabIndex={0}
					>
						<div
							className="absolute top-0 right-0 left-0 bottom-0 bg-primary transition-opacity"
							style={{ opacity: menuIsOpened ? 0.8 : 0 }}
						/>
						<div
							className="gf h-full"
							style={{ background: 'none', boxShadow: '0 0 0 10px var(--primary)' }}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
