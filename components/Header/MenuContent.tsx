import { FC, useContext } from 'react'
import { MenuContext } from '@components/MenuContext'
import Link from '@components/Link'
import { Credits } from './Creadits'

export const MenuContent: FC = () => {
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
