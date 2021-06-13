import { FC, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './HomePresetsSection.module.css'
import useTranslation from 'next-translate/useTranslation'
import { ButtonWithBorderEdges } from '@components/BorderEdge'
import { MenuContext } from '@components/MenuContext'

const InfoTable: FC<{ items: Record<string, string> }> = ({ items }) => (
	<table className="w-full">
		<tbody>
			{Object.keys(items).map((key) => (
				<tr key={key}>
					<td className="py-2 px-6 border-t border-primary20 font-semibold border-r">{key}</td>
					<td className="py-2 px-3 border-t border-primary20">{items[key]}</td>
				</tr>
			))}
		</tbody>
	</table>
)

export const HomePresetsSection: FC = () => {
	const { t } = useTranslation('common')
	const { menuLinks } = useContext(MenuContext)

	return (
		<div className="w-full-p sm:w-full">
			<div
				className={['gfc -ml-bd -mt-bd w-full-p overflow-hidden', 'sm:rounded-b-lg sm:mb-24'].join(
					' '
				)}
			>
				<div
					className="grid lg:grid-cols-12 lg:grid-flow-col-dense"
					style={{ gridAutoRows: 'minmax(20vh, auto)' }}
				>
					<div className="-ml-bd -mt-bd w-full-p lg:col-span-9 lg:row-span-4">
						<div className="gfc grid grid-cols-4 grid-rows-5 sm:grid-rows-5 md:grid-rows-3 h-full">
							<div className="gf col-span-4 row-span-3 sm:row-span-3 md:row-span-2 relative overflow-hidden">
								<span className="text-7xl sm:text-9xl uppercase absolute pointer-events-none top-6 left-4 opacity-10">
									{t('terms.preset')
										.split('-')
										.map((text, idx) => (
											<span className={`${styles.presetLine} block`} key={idx}>
												{text}
											</span>
										))}
								</span>
								<span className="text-7xl sm:text-9xl uppercase absolute pointer-events-none -bottom-7 sm:-bottom-12 left-4 font-medium">
									ICE 243
								</span>
								<div
									className={[
										styles.imageContainer,
										'p-8 absolute top-0 right-0 bottom-0 sm:w-4/6',
									].join(' ')}
								>
									<Image
										src="/images/HomeHeroImage.png"
										width={1530}
										height={1420}
										objectFit="contain"
									/>
								</div>
							</div>
							<div className="gf col-span-4 sm:col-span-3 row-span-2 md:row-span-1 md:col-span-2 flex flex-col justify-between">
								<div className="p-4 sm:p-6">
									<h3 className="text-2xl font-bold">ICE 243</h3>
									<p className="text-lg">598.95€</p>
								</div>
								<InfoTable
									items={{
										[t('components.box')]: 'Black & Opened',
										[t('components.strap')]: 'Green',
										[t('components.board')]: 'Black MDF',
									}}
								/>
							</div>
							<div className="gf relative hidden sm:block">
								<div className={`${styles.imageContainer} absolute inset-0 pr-6 pb-6 pl-14 pt-14`}>
									<Image
										src="/images/HomeHeroImage.png"
										width={1530 / 10}
										height={1420 / 10}
										objectFit="contain"
									/>
								</div>
								<ButtonWithBorderEdges
									edges={[
										{ position: 'BottomLeft', orientation: 'TopLeft' },
										{ position: 'RightTop', orientation: 'TopLeft' },
									]}
									openings={['BottomRight']}
									icon="ArrowLeft"
								>
									Prev
								</ButtonWithBorderEdges>
							</div>
							<div className="gf relative hidden sm:block">
								<div
									className={`${styles.imageContainer} absolute inset-0 pr-6 pb-6 pl-14 pt-14`}
									style={{ transform: 'scaleX(-1)' }}
								>
									<Image
										src="/images/HomeHeroImage.png"
										width={1530 / 10}
										height={1420 / 10}
										objectFit="contain"
									/>
								</div>
								<div className="absolute top-0 -right-bd">
									<ButtonWithBorderEdges
										edges={[
											{ position: 'BottomRight', orientation: 'TopRight' },
											{ position: 'LeftTop', orientation: 'TopRight' },
										]}
										openings={['BottomLeft']}
										icon="ArrowRight"
									>
										Next
									</ButtonWithBorderEdges>
								</div>
							</div>
						</div>
					</div>
					<div className="hidden lg:block col-span-3 row-span-4">
						<ul className={['flex flex-col flex-wrap w-full h-full'].join(' ')}>
							{menuLinks.map((menuLink) =>
								menuLink.path === '/' ? null : (
									<li
										key={menuLink.path}
										className={[
											'gf list-none p-4 uppercase text-2xl grid items-center',
											'leading-6 flex-grow-0 font-bold cursor-pointer',
											'hover:opacity-50 transition-opacity h-auto w-full-p',
										].join(' ')}
									>
										<Link href={menuLink.path}>{t(menuLink.textId)}</Link>
									</li>
								)
							)}
							<li className="gf flex-grow p-8 relative h-96 w-full-p">
								<div className={`${styles.imageContainer} absolute inset-0`}>
									<Image
										src="/images/HomeVerticalImage.png"
										width={276}
										height={530}
										objectFit="cover"
									/>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
