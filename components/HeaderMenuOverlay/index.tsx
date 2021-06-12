import { MenuContext } from '@components/MenuContext'
import { FC, useContext } from 'react'
import styles from './HeaderMenuOverlay.module.css'

export const HeaderMenuOverlay: FC = () => {
	const { closeMenu, menuIsOpened } = useContext(MenuContext)

	return (
		<div
			className={[styles.container, 'gfc h-full z-10 relative'].join(' ')}
			onClick={closeMenu}
			onKeyPress={closeMenu}
			role="button"
			tabIndex={0}
		>
			<div
				className={[
					'absolute sm:fixed top-0 right-0 left-0 bottom-0',
					'bg-primary transition-opacity',
					menuIsOpened ? 'opacity-80' : 'opacity-0',
				].join(' ')}
			/>
			<div className={[styles.overlay, 'gf h-full'].join(' ')} />
		</div>
	)
}
