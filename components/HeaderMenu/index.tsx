import { FC, useContext } from 'react'
import { Button } from '@components/SquareButton'
import Link from '@components/Link'
import { MenuContext } from '@components/MenuContext'
import styles from './HeaderMenu.module.css'

const year = new Date().getFullYear()

export const HeaderMenu: FC = () => {
	const { menuLinks, secondaryLinks, closeMenu } = useContext(MenuContext)

	return (
		<div className={[styles.container, 'gfc h-full z-20 overflow-hidden relative'].join(' ')}>
			<div className={[styles.innerContainer, 'grid grid-flow-row w-full h-full'].join(' ')}>
				<div className="overflow-y-auto border-bd rounded-lg -mt-bd -ml-bd w-full-p">
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
								className={`gf list-none p-4 uppercase text-2xl grid items-center ${
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
						<li className="hidden sm:grid">
							<Button type="button" colorType="Buy" className="w-full-p">
								Checkout <span className="inline-block text-sm font-normal">(599€)</span>
							</Button>
						</li>
						<li
							className="gf list-none w-full-p sm:w-auto h-full-fr p-4 grid grid-flow-row sm:col-span-3 lg:col-span-1 lg:row-span-2"
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
					</ul>
				</div>
				<div className="sm:hidden">
					<Button type="button" colorType="Buy" className="w-full-p">
						Checkout <span className="inline-block text-sm font-normal">(599€)</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
