import { FC, useState } from 'react'
// import Swiper from 'swiper'
import SwiperCore, { Pagination } from 'swiper/core'
import SwiperClass from 'swiper/types/swiper-class'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { PresetInfo } from '@components/PresetInfo'
import { PresetsSliderButton } from '@components/PresetsSliderButton'
import useTranslation from 'next-translate/useTranslation'
import { PresetsSliderImage } from '@components/PresetsSliderImage'

SwiperCore.use([Pagination])

const fakeSlides = [
	{
		id: '1',
		title: 'A01',
		price: 123.45,
		imageUrl: '/images/HomeHeroImage.png',
		boxInfo: 'Opened & Black',
		strapInfo: 'Green',
		boardInfo: 'Black MDF',
	},
	{
		id: '2',
		title: 'ICE 55',
		price: 678.91,
		imageUrl: '/images/HomeHeroImage.png',
		boxInfo: 'Closed & Grey',
		strapInfo: 'Red, Yellow & Blue',
		boardInfo: 'White MDF',
	},
	{
		id: '3',
		title: 'C3P0',
		price: 999.99,
		imageUrl: '/images/HomeHeroImage.png',
		boxInfo: 'Opened & Grey',
		strapInfo: 'Red',
		boardInfo: 'Natural MDF',
	},
]

export const PresetsSlider: FC = () => {
	const { t, lang } = useTranslation('common')
	const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

	const currency = new Intl.NumberFormat(lang, {
		style: 'currency',
		currency: 'EUR',
	})

	return (
		<div className="-ml-bd -mt-bd w-full-p lg:col-span-9 lg:row-span-4">
			<div className="gfc grid grid-cols-4 grid-rows-5 sm:grid-rows-5 md:grid-rows-3 h-full">
				<PresetsSliderImage
					title={fakeSlides[currentSlideIndex].title}
					slides={fakeSlides}
					onSlideChange={setCurrentSlideIndex}
					onReady={setSwiperInstance}
				/>
				<PresetInfo
					title={fakeSlides[currentSlideIndex].title}
					price={currency.format(fakeSlides[currentSlideIndex].price)}
					table={{
						[t('components.box')]: fakeSlides[currentSlideIndex].boxInfo,
						[t('components.strap')]: fakeSlides[currentSlideIndex].strapInfo,
						[t('components.board')]: fakeSlides[currentSlideIndex].boardInfo,
					}}
				/>
				<PresetsSliderButton
					onClick={() => swiperInstance && swiperInstance.slidePrev()}
					imageUrl="/images/HomeHeroImage.png"
				/>
				<PresetsSliderButton
					onClick={() => swiperInstance && swiperInstance.slideNext()}
					imageUrl="/images/HomeHeroImage.png"
					next
				/>
			</div>
		</div>
	)
}
