import Image, { ImageProps } from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

interface ZoomedInViewPropType extends Omit<LoadingImagePropType, 'zoomable' | 'objectFit'> {
	onClose: () => void
}

const ZoomedInView: FC<ZoomedInViewPropType> = ({ src, width, height, onClose, ...rest }) => {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null)
	const windowSize = useWindowSize()
	const [zoomedImageIsLoaded, setZoomedImageIsLoaded] = useState(false)
	const zoomedInSize = cover({
		parentHeight: windowSize.height,
		parentWidth: windowSize.width,
		childHeight: height * 3,
		childWidth: width * 3,
	})

	useEffect(() => {
		setZoomedImageIsLoaded(false)
	}, [src])

	useEffect(() => {
		if (!zoomedImageIsLoaded) return
		scrollContainerRef.current?.scrollTo(
			Math.abs(zoomedInSize.offsetX),
			Math.abs(zoomedInSize.offsetY)
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [zoomedImageIsLoaded])

	return createPortal(
		<>
			<div className="fixed inset-0 bg-primary bg-opacity-80 z-50 overflow-hidden">
				<button
					className={[
						'fixed z-50 top-4 right-4 bg-secondary text-primary border-bd',
						'border-primary w-16 h-16 grid place-content-center font-mono',
						'text-4xl rounded',
					].join(' ')}
					onClick={() => {
						onClose()
						document.querySelector('html')?.classList.remove('no-scroll')
					}}
				>
					✕
				</button>
				<div
					ref={scrollContainerRef}
					className={[
						'fixed w-screen h-screen top-0 left-0',
						zoomedInSize.offsetX !== 0
							? 'overflow-x-scroll overflow-y-hidden'
							: 'overflow-y-scroll overflow-x-hidden',
					]
						.filter(Boolean)
						.join(' ')}
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
				</div>
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
	)
}

export const LoadingImage: FC<LoadingImagePropType> = ({
	src,
	width,
	height,
	objectFit,
	zoomable = false,
	...rest
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isZoomedIn, setIsZoomedIn] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
	}, [src])

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
						document.querySelector('html')?.classList.add('no-scroll')
					}}
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<div
				className={[
					'absolute inset-0 grid place-content-center',
					'transition-all pointer-events-none z-30',
					isLoaded && 'opacity-0',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<LoadingSprite />
			</div>
			{isZoomedIn && zoomable && (
				<ZoomedInView
					src={src}
					width={width}
					height={height}
					onClose={() => setIsZoomedIn(false)}
				/>
			)}
		</>
	)
}
