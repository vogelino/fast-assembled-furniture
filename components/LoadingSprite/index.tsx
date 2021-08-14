import { ColorThemeContext } from '@components/ColorThemeContext'
import { FC, useContext } from 'react'
import styles from './LoadingSprite.module.css'

export const LoadingSprite: FC = () => {
	const { themeKey } = useContext(ColorThemeContext)
	return (
		<div className="p-4 rounded relative bg-primary">
			<div
				className={styles.loadingSprite}
				style={{ backgroundImage: `url("/images/configurator/LoadingSprite/${themeKey}.svg")` }}
			></div>
		</div>
	)
}
