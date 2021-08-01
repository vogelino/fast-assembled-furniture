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
			src="/images/HomeHeroImage.png"
			alt="An isometric view of the furniture"
			width={1920}
			height={919}
			objectFit="cover"
			quality={100}
		/>
	</div>
)
