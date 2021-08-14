import { FC, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'
import styles from './HomeConfigurator.module.css'
import { ColorThemeContext } from '@components/ColorThemeContext'

interface SliderSlideType {
	id: string
	filePath: string
}

interface SliderImagePropType {
	slides: SliderSlideType[]
	onSlideChange: (currentSlide: number) => void
	onReady: (swiper: SwiperClass) => void
}

const HomeConfiguratorSlideImage: FC<SliderSlideType> = ({ filePath }) => {
	const { themeKey } = useContext(ColorThemeContext)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(false)
	}, [filePath])

	return (
		<div style={{ background: 'white' }}>
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
					src={filePath}
					width={1536}
					height={742}
					objectFit="cover"
					onLoad={() => setIsLoaded(true)}
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
				<div className="p-4 rounded relative bg-primary">
					<div
						className={styles.loadingSprite}
						style={{ backgroundImage: `url("/images/configurator/LoadingSprite/${themeKey}.svg")` }}
					></div>
				</div>
			</div>
		</div>
	)
}

export const HomeConfiguratorSlide: FC<SliderImagePropType> = ({
	slides,
	onSlideChange,
	onReady,
}) => (
	<Swiper
		effect="fade"
		className={`${styles.swiperContainer}`}
		onSwiper={onReady}
		onSlideChange={(swiper) => {
			onSlideChange(swiper.activeIndex)
		}}
	>
		{slides.map((slide) => (
			<SwiperSlide key={slide.id} className={styles.swiperSlide}>
				<HomeConfiguratorSlideImage {...slide} />
			</SwiperSlide>
		))}
	</Swiper>
)
