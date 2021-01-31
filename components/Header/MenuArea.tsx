import { MenuContext } from '@components/MenuContext'
import { useContext, FC } from 'react'
import Link from '@components/Link'
import { Button } from '@components/SquareButton'

const year = new Date().getFullYear()

const Credits: FC = () => (
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

const MenuContent: FC = () => {
	const { menuLinks, secondaryLinks, closeMenu } = useContext(MenuContext)
	return (
		<ul
			className="inline-grid grid-flow-row w-full-p"
			style={{
				gridTemplateRows: `repeat(${menuLinks.length}, auto) 1fr`,
				minHeight: 'calc(100% + var(--borderWidth, 3px))',
			}}
		>
			{menuLinks.map((menuLink) => (
				<li key={menuLink.path}>
					<Link
						href={menuLink.path}
						onClick={closeMenu}
						className={`gf block list-none p-4 uppercase text-2xl ${
							menuLink.active
								? 'line-through'
								: 'font-bold cursor-pointer hover:opacity-50 transition-opacity'
						}`}
					>
						{menuLink.title}
					</Link>
				</li>
			))}
			<li
				className="gf list-none w-full-p h-full-fr p-2 grid grid-flow-row gap-4"
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
								inactiveClassName="underline hover:no-underline cursor-pointer p-2"
								onClick={closeMenu}
							>
								{secondaryLink.title}
							</Link>
						</li>
					))}
					<Credits />
				</ul>
			</li>
		</ul>
	)
}

export const MenuArea: FC = () => {
	const { menuIsOpened } = useContext(MenuContext)
	return (
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
				<div className="focus-ring overflow-x-hidden overflow-y-auto border-bd rounded-lg -mt-bd -ml-bd w-full-p">
					{menuIsOpened && <MenuContent />}
				</div>
				<Button type="button" colorType="Buy" className="w-full-p">
					Checkout <span className="inline-block text-sm font-normal">(599€)</span>
				</Button>
			</div>
		</div>
	)
}
