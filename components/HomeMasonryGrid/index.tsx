import { BorderEdge, ButtonWithBorderEdges } from '@components/BorderEdge'
import { Logo } from '@components/Logo'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { FC } from 'react'
import styles from './HomeMasonryGrid.module.css'

export const HomeMasonryGrid: FC = () => {
	const { t: tCommon } = useTranslation('common')
	const { t: tHome } = useTranslation('home')

	return (
		<div className={styles.container}>
			<div className="relative">
				<div className={[styles.buttonsContainer, 'inline-flex bg-primary'].join(' ')}>
					<ButtonWithBorderEdges
						edges={[{ position: 'RightBottom', orientation: 'BottomLeft' }]}
						openings={['TopRight', 'TopLeft']}
						primary
					>
						<span className="hidden sm:inline">{tCommon('actions.edit')}</span>
						<span className="sm:hidden">{tCommon('actions.editShort')}</span>
					</ButtonWithBorderEdges>
				</div>
				<BorderEdge
					orientation="BottomRight"
					className="opacity-100 sm:opacity-0 absolute bottom-0 right-0"
				/>
				<BorderEdge
					orientation="BottomLeft"
					className="opacity-100 sm:opacity-0 absolute -left-bd top-bd transform -translate-y-full"
				/>
			</div>
			<div className="gfc -ml-bd -mt-bd w-full-p sm:rounded-tr-lg">
				<div className="grid grid-cols-12 lg:grid-flow-col-dense">
					<div className={['gf col-span-12 md:col-span-6', 'gap-4 lg:grid-cols-5'].join(' ')}>
						<div className="sm:flex gap-4 items-center p-6 border-b border-primary">
							<Logo />
							<h4 className="sm:inline mt-4 sm:m-0 text-2xl font-bold uppercase leading-6">
								Fast Assembled Furniture
							</h4>
						</div>
						<p className={['md:text-xl lg:text-2xl col-span-3 xl:col-span-5 p-6 pb-8'].join(' ')}>
							{tHome('introduction')}
						</p>
					</div>
					<div
						className={[
							styles.imageContainer,
							'gf col-span-12 lg:col-span-6 lg:row-span-3 order-first md:order-2',
						].join(' ')}
					>
						<Image
							src="/images/LargeBlock01.jpg"
							quality={100}
							width={696}
							height={832}
							objectFit="cover"
						/>
					</div>
					<div className={[styles.imageContainer, 'gf col-span-12 md:col-span-6'].join(' ')}>
						<Image
							src="/images/LandscapeDetail01.jpg"
							quality={100}
							width={544}
							height={268}
							objectFit="cover"
						/>
					</div>
					<div className={[styles.imageContainer, 'gf col-span-12 lg:col-span-3'].join(' ')}>
						<Image
							src="/images/SquareDetail01.jpg"
							quality={100}
							width={272}
							height={290}
							objectFit="cover"
						/>
					</div>
					<div className="relative col-span-12 lg:col-span-3">
						<div className={[styles.middleBlock, 'gf h-full-p'].join(' ')}>
							<div className="flex items-center p-6 border-b border-primary">
								<h4 className="inline text-2xl font-bold uppercase leading-6">Drei zu Eins</h4>
							</div>
							<p className={['md:text-xl lg:text-2xl col-span-3 xl:col-span-5 p-6 pb-8'].join(' ')}>
								{tHome('componentsDescription')}
							</p>
						</div>
						<BorderEdge
							orientation="BottomLeft"
							className="opacity-0 lg:opacity-100 absolute -top-6"
							style={{ left: 'calc(100% - var(--borderWidth, 3px))' }}
						/>
						<BorderEdge
							orientation="BottomLeft"
							className="opacity-0 lg:opacity-100 absolute bottom-0"
							style={{ left: 'calc(200% - var(--borderWidth, 3px))' }}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
