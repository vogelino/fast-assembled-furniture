import Image, { ImageProps } from 'next/image'
import { FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { LoadingSprite } from '@components/LoadingSprite'
import { useWindowSize } from '@utils/hooks/useWindowSize'
import { cover } from '@utils/intrinsicScale'

interface LoadingImagePropType {
	src: string
	width: number
	height: number
	objectFit: 'cover' | 'contain'
	alt?: ImageProps['alt']
	zoomable?: boolean
	quality?: ImageProps['quality']
	objectPosition?: ImageProps['objectPosition']
}

export const LoadingImage: FC<LoadingImagePropType> = ({
	src,
	width,
	height,
	objectFit,
	zoomable = false,
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
	const [{ x, y }, api] = useSpring(() => ({ x: zoomedInSize.offsetX, y: zoomedInSize.offsetY }))

	const isLandscape = zoomedInSize.offsetY === 0 && zoomedInSize.offsetX < 0
	const bind = useDrag(({ down, movement: [mx, my] }) => {
		api.start({
			x: isLandscape ? (down ? mx + zoomedInSize.offsetX : zoomedInSize.offsetX) : 0,
			y: !isLandscape ? (down ? my + zoomedInSize.offsetY : zoomedInSize.offsetY) : 0,
		})
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
						if (!zoomable) return
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
				zoomable &&
				createPortal(
					<>
						<div className="fixed inset-0 bg-primary bg-opacity-80 z-50 overflow-hidden">
							<button
								className={[
									'fixed z-50 top-4 right-4 bg-secondary text-primary border-bd',
									'border-primary w-16 h-16 grid place-content-center font-mono',
									'text-4xl rounded',
								].join(' ')}
								onClick={() => {
									setIsZoomedIn(false)
									document.body.classList.remove('no-scroll')
								}}
							>
								✕
							</button>
							<animated.div
								{...bind()}
								style={{
									width: zoomedInSize.width,
									height: zoomedInSize.height,
									x,
									y,
								}}
							>
								<Image
									src={src}
									width={zoomedInSize.width}
									height={zoomedInSize.height}
									layout="fixed"
									{...rest}
									onLoad={() => setZoomedImageIsLoaded(true)}
									className="pointer-events-none"
								/>
							</animated.div>
							<div
								className={[
									'absolute inset-0 grid place-content-center',
									'transition-all z-10 pointer-events-none',
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
