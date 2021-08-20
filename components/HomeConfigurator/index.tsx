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
import Link from 'next/link'
import { ButtonWithBorderEdges } from '@components/BorderEdge'
import useTranslation from 'next-translate/useTranslation'

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
	const { t } = useTranslation('home')
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
					currentSlideIndex={currentSlideIndex}
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
						<div
							className={[
								styles.themeSelect,
								'p-4 sm:p-5 grid sm:inline-grid gap-x-4 gap-y-2 grid-cols-11',
								'items-center content-center justify-center',
							]
								.filter(Boolean)
								.join(' ')}
						>
							<ThemeSelect keepExpanded />
						</div>
						<InfoTable lightness={activeTabIndex === 0 ? 'light' : 'dark'} />
					</div>
					<div className={['gf p-5 relative pb-20'].join(' ')}>
						<h2 className="font-bold text-xl sm:text-2xl uppercase mb-3">
							{t('disclaimer.title')}
						</h2>
						<p>
							{t('disclaimer.text')}
							<a
								href="mailto:hello@faf.berlin"
								target="_blank"
								rel="noreferrer"
								className="underline"
							>
								hello@faf.berlin
							</a>
							.
						</p>
						<form
							onSubmit={(evt) => evt.preventDefault()}
							className={`flex gap-x-2 mt-5 ${styles.form}`}
						>
							<div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
								<input
									type="checkbox"
									className="opacity-0 absolute w-6 h-6 cursor-pointer"
									name="conditions-accepted"
								/>
								<svg
									className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
									viewBox="0 0 20 20"
								>
									<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
								</svg>
							</div>
							<label htmlFor="conditions-accepted">
								{t('disclaimer.conditionsSentenceBefore')}
								<Link href="/conditions">
									<a href="/conditions" className="font-bold underline">
										{t('disclaimer.conditionsName')}
									</a>
								</Link>
								{t('disclaimer.conditionsSentenceAfter')}
							</label>
						</form>
						<div className="absolute -right-bd -bottom-2 inline-block">
							<ButtonWithBorderEdges
								primary
								openings={['TopLeft']}
								edges={[
									{
										position: 'TopRight',
										orientation: 'BottomRight',
									},
									{
										position: 'LeftBottom',
										orientation: 'BottomRight',
									},
								]}
							>
								{t('disclaimer.button')}
							</ButtonWithBorderEdges>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
