import React, { FC, useContext } from 'react'
import { MenuContext } from '@components/MenuContext'
import { MenuArea } from './MenuArea'
import { MenuSidebar } from './MenuSidebar'
import { MenuOverlay } from './MenuOverlay'

const Header: FC<{ fixed?: boolean }> = ({ fixed = false }) => {
	const { menuIsOpened, cartIsOpened, closeMenu } = useContext(MenuContext)

	return (
		<>
			<MenuSidebar fixed={fixed} />
			<div
				className="top-0 right-0 bottom-0 absolute  z-40"
				style={{
					background: 'none',
					left: 64,
					boxShadow: '0 0 0 10px var(--primary)',
					pointerEvents: menuIsOpened || cartIsOpened ? 'all' : 'none',
					position: fixed ? 'fixed' : 'absolute',
				}}
			>
				<div
					className="relative w-full h-full-p grid gap-0"
					style={{
						gridTemplateColumns: menuIsOpened || cartIsOpened ? '256px 1fr' : '0px 1fr',
						background: 'none',
					}}
				>
					<MenuArea />
					<MenuOverlay isVisible={menuIsOpened || cartIsOpened} fixed={fixed} onClick={closeMenu} />
				</div>
			</div>
		</>
	)
}

export default Header
