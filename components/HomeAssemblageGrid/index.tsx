import { LoadingImage } from '@components/LoadingImage'
import { TabbedBlock } from '@components/TabbedBlock'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import styles from './HomeAssemblageGrid.module.css'

export const HomeAssemblageGrid: FC = () => {
	const { t: tHome } = useTranslation('home')

	return (
		<div className={styles.container}>
			<div className="gfc -ml-bd -mt-bd w-full-p sm:rounded-tr-lg">
				<div className="grid grid-cols-12">
					<div className="col-span-12 sm:col-span-3 grid grid-cols-2 sm:grid-cols-1">
						<div className={[styles.imageContainer, 'gf'].join(' ')}>
							<LoadingImage
								zoomable
								src="/images/SquareDetail02.jpg"
								quality={100}
								width={272}
								height={344}
								objectFit="cover"
								alt=""
							/>
						</div>
						<div
							className={[styles.imageContainer, 'gf'].join(' ')}
							style={{ background: 'white' }}
						>
							<LoadingImage
								zoomable
								src="/images/SquareDetail03.jpg"
								quality={100}
								width={272}
								height={516}
								objectFit="contain"
								alt=""
							/>
						</div>
					</div>
					<div className="col-span-12 sm:col-span-9 grid sm:order-first">
						<div
							className={[styles.imageContainer, 'gf pb-16'].join(' ')}
							style={{ background: 'white' }}
						>
							<LoadingImage
								src="/images/LandscapeGif01.gif"
								quality={100}
								width={1920}
								height={1280}
								objectFit="contain"
								alt=""
							/>
						</div>
						<TabbedBlock
							id="assemblage-anchor"
							tabs={[
								{
									id: 'board',
									title: tHome('board.title'),
									content: (
										<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
											<p className="lg:text-xl p-6 pb-8">{tHome('board.text')}</p>
											<div className="relative">
												<LoadingImage
													src={`/images/BoardDetail01.png`}
													alt={`An isolated view of the ${tHome('board.title')}`}
													width={530}
													height={324}
													objectFit="contain"
													quality={100}
													objectPosition="right"
												/>
											</div>
										</div>
									),
								},
								{
									id: 'box',
									title: tHome('box.title'),
									content: (
										<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
											<p className="lg:text-xl p-6 pb-8">{tHome('box.text')}</p>
											<div className="relative">
												<LoadingImage
													src={`/images/BoxDetail01.png`}
													alt={`An isolated view of the ${tHome('box.title')}`}
													width={530}
													height={324}
													objectFit="contain"
													quality={100}
													objectPosition="right"
												/>
											</div>
										</div>
									),
								},
								{
									id: 'strap',
									title: tHome('strap.title'),
									content: (
										<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
											<p className="lg:text-xl p-6 pb-8">{tHome('strap.text')}</p>
											<div className="relative">
												<LoadingImage
													src={`/images/StrapDetail01.png`}
													width={530}
													height={324}
													objectFit="contain"
													alt={`An isolated view of the ${tHome('strap.title')}`}
													quality={100}
													objectPosition="right"
												/>
											</div>
										</div>
									),
								},
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
