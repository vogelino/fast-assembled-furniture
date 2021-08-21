import { LoadingImage } from '@components/LoadingImage'
import Image from 'next/image'
import { FC, useState } from 'react'
import styles from './HomeHeroSection.module.css'

export const HomeHeroSection: FC = () => {
	const [imageIsLoaded, setImageIsloaded] = useState(false)

	return (
		<div
			className={[
				styles.container,
				styles.fadeIn,
				'w-full flex flex-wrap items-center',
				'pointer-events-none',
			].join(' ')}
		>
			<div className="relative">
				<Image
					src="/images/HomeHeroImage.gif"
					alt="An isometric view of the furniture"
					width={1920}
					height={975}
					objectFit="cover"
					quality={100}
					className="opacity-10"
				/>
				<div
					className={`${
						imageIsLoaded ? 'opacity-100' : 'opacity-0'
					} transition-opacity absolute inset-0`}
				>
					<LoadingImage
						src="/images/HomeHeroImage.png"
						alt="An isometric view of the furniture"
						width={1920}
						height={975}
						objectFit="cover"
						quality={100}
						onLoad={() => {
							setImageIsloaded(true)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
