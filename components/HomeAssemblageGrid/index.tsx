import { TabbedBlock } from '@components/TabbedBlock'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
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
							<Image
								src="/images/SquareDetail02.jpg"
								quality={100}
								width={272}
								height={344}
								objectFit="cover"
							/>
						</div>
						<div
							className={[styles.imageContainer, 'gf'].join(' ')}
							style={{ background: 'white' }}
						>
							<Image
								src="/images/SquareDetail03.jpg"
								quality={100}
								width={272}
								height={516}
								objectFit="contain"
							/>
						</div>
					</div>
					<div className="col-span-12 sm:col-span-9 grid sm:order-first">
						<div
							className={[styles.imageContainer, 'gf pb-16'].join(' ')}
							style={{ background: 'white' }}
						>
							<Image
								src="/images/LandscapeGif01.gif"
								quality={100}
								width={1920}
								height={1280}
								objectFit="contain"
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
											<Image
												src={`/images/BoardDetail01.png`}
												alt={`An isolated view of the ${tHome('board.title')}`}
												width={530}
												height={324}
												objectFit="contain"
												quality={100}
												objectPosition="right"
											/>
										</div>
									),
								},
								{
									id: 'box',
									title: tHome('box.title'),
									content: (
										<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
											<p className="lg:text-xl p-6 pb-8">{tHome('box.text')}</p>
											<Image
												src={`/images/BoxDetail01.png`}
												alt={`An isolated view of the ${tHome('box.title')}`}
												width={530}
												height={324}
												objectFit="contain"
												quality={100}
												objectPosition="right"
											/>
										</div>
									),
								},
								{
									id: 'strap',
									title: tHome('strap.title'),
									content: (
										<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
											<p className="lg:text-xl p-6 pb-8">{tHome('strap.text')}</p>
											<Image
												src={`/images/StrapDetail01.png`}
												alt={`An isolated view of the ${tHome('strap.title')}`}
												width={530}
												height={324}
												objectFit="contain"
												quality={100}
												objectPosition="right"
											/>
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
