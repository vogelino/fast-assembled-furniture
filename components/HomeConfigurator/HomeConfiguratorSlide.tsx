import { FC } from 'react'
import Image from 'next/image'
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
		{slides.map(({ id, filePath }) => (
			<SwiperSlide key={id} className={styles.swiperSlide}>
				<Image
					src={filePath}
					width={1536}
					height={742}
					objectFit="cover"
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP89B8AAukB8/71MdcAAAAASUVORK5CYII="
				/>
			</SwiperSlide>
		))}
	</Swiper>
)
