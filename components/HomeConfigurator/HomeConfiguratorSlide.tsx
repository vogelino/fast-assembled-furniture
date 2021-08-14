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
