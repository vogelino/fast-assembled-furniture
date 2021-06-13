import { FC } from 'react'
import styles from './HeaderMenuOverlay.module.css'

export const HeaderMenuOverlay: FC<{
	isOpened: boolean
	onClose: () => void
}> = ({ onClose, isOpened }) => (
	<div
		className={['h-full z-10 relative'].join(' ')}
		onClick={onClose}
		onKeyPress={onClose}
		role="button"
		tabIndex={0}
	>
		<div
			className={[
				'absolute sm:fixed top-0 right-0 left-0 bottom-0',
				'bg-primary transition-opacity',
				isOpened ? 'opacity-80' : 'opacity-0',
			].join(' ')}
		/>
		<div
			className={[
				styles.overlay,
				'absolute inset-0 border-bd rounded-lg bg-secondary h-full',
				isOpened ? 'opacity-80' : 'opacity-0',
			].join(' ')}
		/>
	</div>
)
