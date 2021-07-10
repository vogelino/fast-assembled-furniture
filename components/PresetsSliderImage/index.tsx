import { FC } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'
import styles from './PresetsSliderImage.module.css'
import useTranslation from 'next-translate/useTranslation'

interface PresetsSliderSlideType {
	id: string
	title: string
	price: number
	imageUrl: string
}

interface PresetsSliderImagePropType {
	title: string
	slides: PresetsSliderSlideType[]
	onSlideChange: (currentSlide: number) => void
	onReady: (swiper: SwiperClass) => void
}

export const PresetsSliderImage: FC<PresetsSliderImagePropType> = ({
	title,
	slides,
	onSlideChange,
	onReady,
}) => {
	const { t } = useTranslation('common')

	return (
		<div className="gf col-span-4 row-span-3 sm:row-span-3 md:row-span-2 relative overflow-hidden">
			<span className="text-7xl sm:text-9xl uppercase absolute pointer-events-none top-6 left-4 opacity-10 z-10">
				{t('terms.preset')
					.split('-')
					.map((text, idx) => (
						<span className={`${styles.presetLine} block`} key={idx}>
							{text}
						</span>
					))}
			</span>
			<span className="text-7xl sm:text-9xl uppercase absolute pointer-events-none -bottom-7 sm:-bottom-12 left-4 font-medium  z-10">
				{title}
			</span>
			<Swiper
				effect="fade"
				pagination={true}
				className={`${styles.swiperContainer} absolute w-full h-full`}
				onSwiper={onReady}
				onSlideChange={(swiper) => {
					onSlideChange(swiper.activeIndex)
				}}
				loop
			>
				{slides.map(({ id, imageUrl }) => (
					<SwiperSlide key={id}>
						<div className="image-container p-8 absolute inset-0">
							<Image
								src={imageUrl}
								width={1225 / 2}
								height={875 / 2}
								objectFit="contain"
								objectPosition="right"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
