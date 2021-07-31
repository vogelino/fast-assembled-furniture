import Image from 'next/image'
import { FC } from 'react'
import styles from './HomeHeroSection.module.css'

export const HomeHeroSection: FC = () => (
	<div
		className={[
			styles.container,
			styles.fadeIn,
			'w-full flex items-center',
			'pointer-events-none',
		].join(' ')}
	>
		<Image
			src="/images/HomeHeroImage.jpg"
			alt="An isometric view of the furniture"
			width={2780 / 2}
			height={1638 / 2}
			objectFit="cover"
			quality={100}
		/>
	</div>
)
