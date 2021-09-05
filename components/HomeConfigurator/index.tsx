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

type PaymentLinksType = Record<string, Record<string, string>>

const paymentLinks: PaymentLinksType = {
	light: {
		light: 'https://buy.stripe.com/00g14WblC9qY5t67sy',
		dark: 'https://buy.stripe.com/4gw4h89du0Usg7K28c',
		blau: 'https://buy.stripe.com/3cs9Bs89q0Us9JmbJ4',
		rosa: 'https://buy.stripe.com/dR6fZQ0GYdHeaNqdQY',
		silber: 'https://buy.stripe.com/00g00SahycDabRu4gq',
		gelb: 'https://buy.stripe.com/8wM2900GY8mU6xa8wB',
		orange: 'https://buy.stripe.com/7sI5lcblCav29Jm5kr',
		vlieder: 'https://buy.stripe.com/4gwfZQdtK7iQ7Be7st',
		rot: 'https://buy.stripe.com/00g9Bs61i0Us1cQ4gp',
		beige: 'https://buy.stripe.com/dR6eVMdtK7iQ5t64gi',
		olive: 'https://buy.stripe.com/3cs3d42P69qYg7K288',
	},
	dark: {
		light: 'https://buy.stripe.com/00gbJAgFW7iQ8FiaET',
		dark: 'https://buy.stripe.com/dR614W4Xebz6bRu5kx',
		blau: 'https://buy.stripe.com/5kA6pgahy1Ywf3GeV6',
		rosa: 'https://buy.stripe.com/cN27tkahyeLi3kY6oG',
		silber: 'https://buy.stripe.com/cN2aFw89qcDabRueVe',
		gelb: 'https://buy.stripe.com/dR66pg89qdHe6xa5ky',
		orange: 'https://buy.stripe.com/aEU6pgcpGgTq9JmdR7',
		vlieder: 'https://buy.stripe.com/fZedRI3TagTq9Jm3cx',
		rot: 'https://buy.stripe.com/bIY3d43TagTq8Fi7sL',
		beige: 'https://buy.stripe.com/6oE00S89q7iQ8Fi7sD',
		olive: 'https://buy.stripe.com/cN200Sahy8mU2gU00g',
	},
}

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
	const lightnessMode = activeTabIndex === 0 ? 'light' : 'dark'
	const slidesWithFullPath = fakeSlides.map(({ id, fileName }) => ({
		id,
		filePath: `/images/configurator/${lightnessMode}/${themeKey}/${fileName}`,
	}))

	return (
		<div className={styles.container}>
			<div className="w-full overflow-hidden relative" id="configurator-anchor">
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
					id="configurator-tabs"
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
						<div className={[styles.themeSelect, 'p-4 sm:p-5'].filter(Boolean).join(' ')}>
							<span
								className="grid sm:inline-grid gap-x-4 gap-y-2 grid-cols-11 rounded-full px-3 items-center content-center justify-center"
								style={{ background: 'white' }}
							>
								<ThemeSelect keepExpanded />
							</span>
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
								<Link href="/agb">
									<a href="/agb" className="font-bold underline">
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
								onClick={() => {
									if (paymentLinks[lightnessMode] && paymentLinks[lightnessMode][themeKey]) {
										const paymentLink = paymentLinks[lightnessMode][themeKey]
										window.open(paymentLink, '_blank')
									}
								}}
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
