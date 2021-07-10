import { FC, useState } from 'react'
// import Swiper from 'swiper'
import SwiperCore, { Pagination, EffectFade } from 'swiper/core'
import SwiperClass from 'swiper/types/swiper-class'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { PresetInfo } from '@components/PresetInfo'
import { PresetsSliderButton } from '@components/PresetsSliderButton'
import useTranslation from 'next-translate/useTranslation'
import { PresetsSliderImage } from '@components/PresetsSliderImage'

SwiperCore.use([EffectFade, Pagination])

const fakeSlides = [
	{
		id: '1',
		title: 'ÖGÜB',
		price: 123.45,
		imageUrl: '/images/th-31644131984-1225x875.png',
		boxInfo: 'Geöffnet & Grau',
		strapInfo: 'Olivgrün',
		boardInfo: 'Beschichtetes Holz',
	},
	{
		id: '2',
		title: 'ÖGBE',
		price: 678.91,
		imageUrl: '/images/th-31644133651-1225x875.png',
		boxInfo: 'Geöffnet & Grau',
		strapInfo: 'Beige',
		boardInfo: 'Beschichtetes Holz',
	},
	{
		id: '3',
		title: 'BLÖK',
		price: 999.99,
		imageUrl: '/images/th-31644135010-1225x875.png',
		boxInfo: 'Geöffnet & Grau',
		strapInfo: 'Black',
		boardInfo: 'Beschichtetes Holz',
	},
	{
		id: '4',
		title: 'PIGÖ',
		price: 999.99,
		imageUrl: '/images/th-31644138607-1225x875.png',
		boxInfo: 'Geöffnet & Grau',
		strapInfo: 'Pink',
		boardInfo: 'Beschichtetes Holz',
	},
	{
		id: '5',
		title: 'ÖRGG',
		price: 999.99,
		imageUrl: '/images/th-31644138927-1225x875.png',
		boxInfo: 'Geöffnet & Grau',
		strapInfo: 'Orange',
		boardInfo: 'Beschichtetes Holz',
	},
]

export const PresetsSlider: FC = () => {
	const { t, lang } = useTranslation('common')
	const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
	const prevSlideId = currentSlideIndex - 1 < 0 ? fakeSlides.length - 1 : currentSlideIndex - 1
	const nextSlideId = currentSlideIndex + 1 > fakeSlides.length - 1 ? 0 : currentSlideIndex + 1

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
					onSlideChange={(idx) => setCurrentSlideIndex(idx - 1)}
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
					onClick={() => swiperInstance && swiperInstance.slideTo(prevSlideId + 1)}
					imageUrl={fakeSlides[prevSlideId].imageUrl}
				/>
				<PresetsSliderButton
					onClick={() => swiperInstance && swiperInstance.slideTo(nextSlideId + 1)}
					imageUrl={fakeSlides[nextSlideId].imageUrl}
					next
				/>
			</div>
		</div>
	)
}
