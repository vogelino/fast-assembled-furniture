import { LoadingImage } from '@components/LoadingImage'
import { FC } from 'react'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import styles from './HomeConfigurator.module.css'

interface SliderSlideType {
	id: string
	filePath: string
}

interface SliderImagePropType {
	slides: SliderSlideType[]
	onSlideChange: (currentSlide: number) => void
	onReady: SwiperProps['onSwiper']
	currentSlideIndex: number
}

const HomeConfiguratorSlideImage: FC<SliderSlideType> = ({ filePath }) => {
	return (
		<div style={{ background: 'white' }}>
			<LoadingImage src={filePath} width={1536} height={742} objectFit="cover" zoomable />
		</div>
	)
}

export const HomeConfiguratorSlide: FC<SliderImagePropType> = ({
	slides,
	onSlideChange,
	onReady = () => undefined,
	currentSlideIndex,
}) => (
	<Swiper
		effect="fade"
		className={`${styles.swiperContainer}`}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
