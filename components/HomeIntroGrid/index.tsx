import { BorderEdge, ButtonWithBorderEdges } from '@components/BorderEdge'
import { LoadingImage } from '@components/LoadingImage'
import { Logo } from '@components/Logo'
import { scrollToTargetAdjusted } from '@utils/scrollUtil'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import styles from './HomeIntroGrid.module.css'

export const HomeIntroGrid: FC = () => {
	const { t: tCommon } = useTranslation('common')
	const { t: tHome } = useTranslation('home')

	return (
		<div className={styles.container}>
			<div className="relative">
				<div className={[styles.buttonsContainer, 'inline-flex bg-primary'].join(' ')}>
					<ButtonWithBorderEdges
						edges={[{ position: 'RightBottom', orientation: 'BottomLeft' }]}
						openings={['TopRight', 'TopLeft']}
						onClick={() => {
							scrollToTargetAdjusted('configurator-anchor')
						}}
						primary
					>
						<span className="hidden sm:inline">{tCommon('actions.edit')}</span>
						<span className="sm:hidden">{tCommon('actions.editShort')}</span>
					</ButtonWithBorderEdges>
				</div>
				<BorderEdge
					orientation="BottomRight"
					className="absolute bottom-0 right-0 opacity-100 sm:opacity-0"
				/>
				<BorderEdge
					orientation="BottomLeft"
					className="absolute opacity-100 sm:opacity-0 -left-bd top-bd transform -translate-y-full"
				/>
			</div>
			<div className="gfc -ml-bd -mt-bd w-full-p sm:rounded-tr-lg">
				<div className="grid grid-cols-12 lg:grid-flow-col-dense">
					<div
						className={['gf col-span-12 md:col-span-6', 'gap-4 lg:grid-cols-5'].join(' ')}
						id="introduction-anchor"
					>
						<div className="items-center p-6 border-b sm:flex gap-4 border-primary">
							<Logo />
							<h4 className="mt-4 text-2xl font-bold uppercase sm:inline sm:m-0 leading-6">
								Fast Assembled Furniture
							</h4>
						</div>
						<p className={['md:text-xl lg:text-2xl col-span-3 xl:col-span-5 p-6 pb-8'].join(' ')}>
							{tHome('introduction.text')}
						</p>
					</div>
					<div
						className={[
							styles.imageContainer,
							'gf col-span-12 lg:col-span-6 lg:row-span-3 order-first md:order-2',
						].join(' ')}
					>
						<LoadingImage
							zoomable
							src="/images/LargeBlock01.jpg"
							quality={100}
							width={696}
							height={832}
							objectFit="cover"
						/>
					</div>
					<div className={[styles.imageContainer, 'gf col-span-12 md:col-span-6'].join(' ')}>
						<LoadingImage
							zoomable
							src="/images/LandscapeDetail01.jpg"
							quality={100}
							width={544}
							height={268}
							objectFit="cover"
						/>
					</div>
					<div className={[styles.imageContainer, 'gf col-span-12 lg:col-span-3'].join(' ')}>
						<LoadingImage
							zoomable
							src="/images/SquareDetail01.jpg"
							quality={100}
							width={272}
							height={290}
							objectFit="cover"
						/>
					</div>
					<div className="relative col-span-12 lg:col-span-3">
						<div className={[styles.middleBlock, 'gf h-full-p'].join(' ')} id="components-anchor">
							<div className="flex items-center p-6 border-b border-primary">
								<h4 className="inline text-2xl font-bold uppercase leading-6">
									{tHome('components.title')}
								</h4>
							</div>
							<p className={['lg:text-xl col-span-3 xl:col-span-5 p-6 pb-8'].join(' ')}>
								{tHome('components.text')}
							</p>
						</div>
						<BorderEdge
							orientation="BottomLeft"
							className="absolute opacity-0 lg:opacity-100 -top-6"
							style={{ left: 'calc(100% - var(--borderWidth, 2px))' }}
						/>
						<BorderEdge
							orientation="BottomLeft"
							className="absolute bottom-0 opacity-0 lg:opacity-100"
							style={{ left: 'calc(200% - var(--borderWidth, 2px))' }}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
