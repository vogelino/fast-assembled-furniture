import useWindowSize from '@utils/hooks/useWindowSize'
import { cover } from '@utils/intrinsicScale'
import Image from 'next/image'
import { FC, useState } from 'react'
import styles from './HomeHeroSection.module.css'

const imgWidth = 1920
const imgHeight = 975

export const HomeHeroSection: FC = () => {
	const [imageIsLoaded, setImageIsloaded] = useState(false)
	const windowSize = useWindowSize()
	const zoomedInSize = cover({
		parentHeight: windowSize.height - 60,
		parentWidth: windowSize.width,
		childWidth: imgWidth,
		childHeight: imgHeight,
	})
	const isMobile = windowSize.width < 640

	return (
		<div
			className={[
				styles.container,
				styles.fadeIn,
				'w-full flex flex-wrap items-center',
				'pointer-events-none',
			].join(' ')}
			style={{
				['--imgWidth' as string]: zoomedInSize.width,
				['--imgHeight' as string]: zoomedInSize.height,
			}}
		>
			<div className="relative">
				<Image
					src="/images/HomeHeroImage.gif"
					alt="An isometric view of the furniture"
					width={isMobile ? zoomedInSize.width : imgWidth}
					height={isMobile ? zoomedInSize.height : imgHeight}
					layout={isMobile ? 'fixed' : 'intrinsic'}
					quality={100}
					className="opacity-10"
				/>
				<div
					className={`${
						imageIsLoaded ? 'opacity-100' : 'opacity-0'
					} transition-opacity absolute inset-0`}
				>
					<Image
						src="/images/HomeHeroImage.png"
						alt="An isometric view of the furniture"
						width={isMobile ? zoomedInSize.width : imgWidth}
						height={isMobile ? zoomedInSize.height : imgHeight}
						layout={isMobile ? 'fixed' : 'intrinsic'}
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
