import { LoadingSprite } from '@components/LoadingSprite'
import { useWindowSize } from '@utils/hooks/useWindowSize'
import { cover } from '@utils/intrinsicScale'
import Image, { ImageProps } from 'next/image'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type LoadingImagePropType = ImageProps & {
	src: string
	width: number
	height: number
	objectFit: 'cover' | 'contain'
	alt?: ImageProps['alt']
	zoomable?: boolean
	quality?: ImageProps['quality']
	className?: ImageProps['className']
	onLoad?: ImageProps['onLoad']
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

	const escFunction = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Enter') onClose()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false)
		return () => document.removeEventListener('keydown', escFunction, false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return createPortal(
		<>
			<div
				role="button"
				onClick={onClose}
				onKeyPress={(evt) => evt.key === 'escape' && onClose()}
				tabIndex={0}
				className="fixed inset-0 bg-primary bg-opacity-80 z-50 overflow-hidden cursor-[zoom-out]"
			>
				<button
					className={[
						'fixed z-50 top-4 right-4 bg-secondary text-primary border-bd',
						'border-primary w-16 h-16 grid place-content-center font-mono',
						'text-4xl rounded',
					].join(' ')}
					onClick={onClose}
				>
					✕
				</button>
				<div
					ref={scrollContainerRef}
					className={[
						'fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-secondary',
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
						{...rest}
						quality={100}
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
	className = '',
	onLoad = () => undefined,
	quality,
	...rest
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isZoomedIn, setIsZoomedIn] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
	}, [src])

	return (
		<>
			<Image
				src={src}
				width={width}
				height={height}
				objectFit={objectFit}
				quality={quality}
				{...rest}
				onClick={() => {
					if (!zoomable) return
					setIsZoomedIn(true)
					document.querySelector('html')?.classList.add('no-scroll')
				}}
				onLoad={(evt) => {
					setIsLoaded(true)
					onLoad(evt)
				}}
				className={[
					className,
					'transition-all filter',
					zoomable && 'cursor-[zoom-in]',
					isLoaded
						? 'grayscale-0 brightness-100 opacity-100'
						: 'grayscale brightness-125 opacity-50',
				]
					.filter(Boolean)
					.join(' ')}
			/>
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
					alt={rest.alt || ''}
					onClose={() => {
						setIsZoomedIn(false)
						document.querySelector('html')?.classList.remove('no-scroll')
					}}
				/>
			)}
		</>
	)
}
