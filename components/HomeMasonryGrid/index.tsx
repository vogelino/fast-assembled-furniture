import { BorderEdge, ButtonWithBorderEdges } from '@components/BorderEdge'
import { Logo } from '@components/Logo'
import { Button } from '@components/SquareButton'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { FC } from 'react'
import styles from './HomeMasonryGrid.module.css'

export const HomeMasonryGrid: FC = () => {
	const { t: tCommon } = useTranslation('common')
	const { t: tHome } = useTranslation('home')
	const marqueeLine = `${tCommon('components.box')} · ${tCommon('components.strap')} · ${tCommon(
		'components.board'
	)} · `

	return (
		<div className={styles.container}>
			<div className="relative">
				<div className={[styles.buttonsContainer, 'inline-flex bg-primary'].join(' ')}>
					<Button type="button" colorType="Buy">
						<span className="whitespace-nowrap">
							<span className="hidden sm:inline">{tCommon('actions.buy')}</span>
							<span className="sm:hidden">{tCommon('actions.buyShort')}</span>
						</span>
					</Button>
					<ButtonWithBorderEdges
						edges={[{ position: 'RightBottom', orientation: 'BottomLeft' }]}
						openings={['TopRight']}
						colorType="Edit"
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
					<div
						className={[
							'gf col-span-12 sm:col-span-6 lg:col-span-6',
							'grid gap-4 lg:grid-cols-5 p-4 pb-6 sm:p-8',
							'xl:grid-cols-7',
						].join(' ')}
					>
						<div className="col-span-2 flex sm:block">
							<Logo framed={false} className="transform scale-75 origin-top-left hidden sm:grid" />
							<h4 className="text-2xl font-bold uppercase leading-6 inline-block">
								Fast
								<br />
								Assembled
								<br />
								Furniture
							</h4>
						</div>
						<p className={['md:text-xl lg:text-2xl col-span-3 xl:col-span-5 sm:pl-0'].join(' ')}>
							{tHome('introduction')}
						</p>
					</div>
					<div
						className={[
							styles.imageContainer,
							'gf col-span-12 sm:col-span-6 lg:col-span-6 lg:row-span-3 order-first sm:order-2',
						].join(' ')}
					>
						<Image src="/images/LargeBlock01.png" width={696} height={808} objectFit="cover" />
					</div>
					<div className={[styles.imageContainer, 'gf col-span-6 lg:col-span-3'].join(' ')}>
						<Image src="/images/Detail01.png" width={300} height={300} objectFit="cover" />
					</div>
					<div className="relative col-span-6 lg:col-span-3">
						<div className={[styles.imageContainer, 'absolute gf h-full-p w-full-p'].join(' ')}>
							<Image src="/images/Detail03.png" width={300} height={300} objectFit="cover" />
						</div>
					</div>
					<div
						className={[styles.imageContainer, 'hidden sm:block gf col-span-6 lg:col-span-3'].join(
							' '
						)}
					>
						<Image src="/images/Detail02.png" width={300} height={300} objectFit="cover" />
					</div>
					<div className="relative col-span-12 sm:col-span-6 lg:col-span-3">
						<div
							className={[styles.middleBlock, 'gf h-full-p p-4 pt-14 pb-6 sm:p-8 sm:pt-24'].join(
								' '
							)}
						>
							<div
								className={[
									styles.marquee,
									'absolute text-2xl uppercase font-bold whitespace-nowrap top-4 sm:top-10',
								].join(' ')}
							>
								<div className={styles.marqueeInner} aria-hidden>
									<span>{marqueeLine}&nbsp;</span>
									<span>{marqueeLine}&nbsp;</span>
									<span>{marqueeLine}&nbsp;</span>
									<span>{marqueeLine}&nbsp;</span>
								</div>
							</div>
							<p className="md:text-xl lg:text-2xl">{tHome('componentsDescription')}</p>
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
