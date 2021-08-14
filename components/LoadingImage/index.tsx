import { LoadingSprite } from '@components/LoadingSprite'
import Image, { ImageProps } from 'next/image'
import { FC, useEffect, useState } from 'react'

interface LoadingImagePropType {
	src: string
	width: number
	height: number
	objectFit: 'cover' | 'contain'
	alt?: ImageProps['alt']
	quality?: ImageProps['quality']
	objectPosition?: ImageProps['objectPosition']
}

const loadedImagesCache = new Map<string, boolean>()

export const LoadingImage: FC<LoadingImagePropType> = ({
	src,
	width,
	height,
	objectFit,
	...rest
}) => {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (loadedImagesCache.get(src) === true) {
			setIsLoaded(true)
		} else {
			setIsLoaded(false)
		}
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
					onLoad={() => {
						loadedImagesCache.set(src, true)
						setIsLoaded(true)
					}}
				/>
			</div>
			<div
				className={[
					'absolute inset-0 grid place-content-center',
					'transition-all',
					isLoaded && 'opacity-0',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<LoadingSprite />
			</div>
		</>
	)
}
