import { LoadingImage } from '@components/LoadingImage'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'
import styles from './HomeConfigurator.module.css'

interface SliderSlideType {
	id: string
	filePath: string
}

interface SliderImagePropType {
	slides: SliderSlideType[]
	onSlideChange: (currentSlide: number) => void
	onReady: (swiper: SwiperClass) => void
	currentSlideIndex: number
}

const HomeConfiguratorSlideImage: FC<SliderSlideType> = ({ filePath }) => {
	return (
		<div style={{ background: 'white' }}>
			<LoadingImage src={filePath} width={1536} height={742} objectFit="cover" />
		</div>
	)
}

export const HomeConfiguratorSlide: FC<SliderImagePropType> = ({
	slides,
	onSlideChange,
	onReady,
	currentSlideIndex,
}) => (
	<Swiper
		effect="fade"
		className={`${styles.swiperContainer}`}
		onSwiper={onReady}
		onSlideChange={(swiper) => {
			onSlideChange(swiper.activeIndex)
		}}
	>
		{slides.map((slide, idx) => (
			<SwiperSlide
				key={slide.id}
				className={[styles.swiperSlide, currentSlideIndex === idx && styles.swiperSlideActive]
					.filter(Boolean)
					.join(' ')}
			>
				<HomeConfiguratorSlideImage {...slide} />
			</SwiperSlide>
		))}
	</Swiper>
)
