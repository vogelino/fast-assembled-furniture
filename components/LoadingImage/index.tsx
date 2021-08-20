import { LoadingSprite } from '@components/LoadingSprite'
import { useWindowSize } from '@utils/hooks/useWindowSize'
import { cover } from '@utils/intrisicScale'
import Image, { ImageProps } from 'next/image'
import { FC, useState } from 'react'
import { createPortal } from 'react-dom'

interface LoadingImagePropType {
	src: string
	width: number
	height: number
	objectFit: 'cover' | 'contain'
	alt?: ImageProps['alt']
	quality?: ImageProps['quality']
	objectPosition?: ImageProps['objectPosition']
}

export const LoadingImage: FC<LoadingImagePropType> = ({
	src,
	width,
	height,
	objectFit,
	...rest
}) => {
	const windowSize = useWindowSize()
	const [isLoaded, setIsLoaded] = useState(false)
	const [zoomedImageIsLoaded, setZoomedImageIsLoaded] = useState(false)
	const [isZoomedIn, setIsZoomedIn] = useState(false)

	const zoomedInSize = cover({
		parentHeight: windowSize.height,
		parentWidth: windowSize.width,
		childHeight: height * 3,
		childWidth: width * 3,
	})

	return (
		<>
			<div
				className={[
					'transition-all filter transform',
					isLoaded
						? 'grayscale-0 brightness-100 opacity-100'
						: 'grayscale brightness-125 opacity-50',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<Image
					src={src}
					width={width}
					height={height}
					objectFit={objectFit}
					{...rest}
					onClick={() => {
						setIsZoomedIn(true)
						document.body.classList.add('no-scroll')
					}}
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<div
				className={[
					'absolute inset-0 grid place-content-center',
					'transition-all',
					isLoaded && 'opacity-0 pointer-events-none',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<LoadingSprite />
			</div>
			{isZoomedIn &&
				createPortal(
					<>
						<div
							role="button"
							onClick={() => {
								setIsZoomedIn(false)
								document.body.classList.remove('no-scroll')
							}}
							onKeyUp={(evt) => evt.key === 'enter' && setIsZoomedIn(false)}
							tabIndex={0}
							className="fixed inset-0 bg-primary bg-opacity-80 z-50 overflow-hidden"
						>
							<div
								style={{
									width: zoomedInSize.width,
									height: zoomedInSize.height,
									transform: `translate(${zoomedInSize.offsetX}px,${zoomedInSize.offsetY}px)`,
								}}
							>
								<Image
									src={src}
									width={zoomedInSize.width}
									height={zoomedInSize.height}
									layout="fixed"
									{...rest}
									onLoad={() => setZoomedImageIsLoaded(true)}
								/>
							</div>
							<div
								className={[
									'absolute inset-0 grid place-content-center',
									'transition-all z-10',
									zoomedImageIsLoaded && 'opacity-0',
								]
									.filter(Boolean)
									.join(' ')}
							>
								<LoadingSprite />
							</div>
						</div>
					</>,
					document.getElementById('__next') || document.body
				)}
		</>
	)
}
