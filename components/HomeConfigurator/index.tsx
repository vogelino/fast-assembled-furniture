import React, { FC, useContext, useState } from 'react'
import SwiperCore, { EffectFade } from 'swiper/core'
import SwiperClass from 'swiper/types/swiper-class'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import styles from './HomeConfigurator.module.css'
import { HomeConfiguratorSlide } from './HomeConfiguratorSlide'
import Image from 'next/image'
import { ColorThemeContext } from '@components/ColorThemeContext'
import { TabbedBlockTabs } from '@components/TabbedBlock'
import ThemeSelect from '@components/ThemeSelect'
import { InfoTable } from '@components/InfoTable'

SwiperCore.use([EffectFade])

const fakeSlides = [
	{
		id: '1',
		fileName: 'ConfiguratorGeneralView.jpg',
	},
	{
		id: '2',
		fileName: 'ConfiguratorDetailView.jpg',
	},
]

const tabs = [
	{
		id: 'light',
		title: 'Light',
		content: <div className="p-4 sm:p-6">Hello</div>,
	},
	{
		id: 'dark',
		title: 'Dark',
		content: <div className="p-4 sm:p-6">World</div>,
	},
]

export const HomeConfigurator: FC = () => {
	const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const { themeKey } = useContext(ColorThemeContext)
	const slidesWithFullPath = fakeSlides.map(({ id, fileName }) => ({
		id,
		filePath: `/images/configurator/${
			activeTabIndex === 0 ? 'light' : 'dark'
		}/${themeKey}/${fileName}`,
	}))

	return (
		<div className={styles.container}>
			<div className="w-full overflow-hidden relative">
				<HomeConfiguratorSlide
					slides={slidesWithFullPath}
					onSlideChange={setCurrentSlideIndex}
					onReady={setSwiperInstance}
				/>
				<div
					className={[
						'absolute bottom-4 sm:bottom-5 right-3 sm:right-4',
						'flex gap-2 sm:gap-4 z-10',
					].join(' ')}
				>
					{slidesWithFullPath.map(({ id, filePath }, idx) => (
						<button
							key={id}
							onClick={() => swiperInstance?.slideTo(idx)}
							style={{ background: 'white' }}
							className={[
								'inline-block w-16 h-10 rounded border border-primary',
								'overflow-hidden',
								idx === currentSlideIndex ? 'border-2 hidden sm:block' : ' opacity-50',
							]
								.filter(Boolean)
								.join(' ')}
						>
							<Image src={filePath} width={64} height={40} quality={90} objectFit="cover" />
						</button>
					))}
				</div>
			</div>
			<div className="relative z-20 lg:-mt-1.5">
				<TabbedBlockTabs
					tabsParentClassName="z-30 pl-bd"
					tabs={tabs}
					onTabChange={(idx) => setActiveTabIndex(idx)}
					activeTabIndex={activeTabIndex}
				/>
				<div className={['gfc grid sm:grid-cols-2 relative z-20', styles.infoBlock].join(' ')}>
					<div
						className={['gf', activeTabIndex === 0 && styles.firstTabBlock]
							.filter(Boolean)
							.join(' ')}
					>
						<div className="py-4 px-5 flex flex-wrap gap-x-3 items-start">
							<ThemeSelect keepExpanded />
						</div>
						<InfoTable />
					</div>
					<div className={['gf'].join(' ')}>{tabs[activeTabIndex].content}</div>
				</div>
			</div>
		</div>
	)
}
