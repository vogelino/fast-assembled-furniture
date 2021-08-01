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
						<div className={[styles.imageContainer, 'gf'].join(' ')}>
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
						<div className={[styles.imageContainer, 'gf'].join(' ')}>
							<Image
								src="/images/LandscapeGif01.gif"
								quality={100}
								width={1920}
								height={1011}
								objectFit="contain"
							/>
						</div>
						<TabbedBlock
							tabs={[
								{
									img: 'BoardDetail01.jpg',
									id: 'board',
									title: tHome('board.title'),
									text: tHome('board.text'),
								},
								{
									img: 'BoxDetail01.jpg',
									id: 'box',
									title: tHome('box.title'),
									text: tHome('box.text'),
								},
								{
									img: 'StrapDetail01.jpg',
									id: 'strap',
									title: tHome('strap.title'),
									text: tHome('strap.text'),
								},
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
