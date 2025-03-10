import { LoadingImage } from '@components/LoadingImage'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import styles from './HomeStructureGrid.module.css'

export const HomeStructureGrid: FC = () => {
	const { t: tHome } = useTranslation('home')

	return (
		<div className={styles.container}>
			<div className={[styles.wrapper, 'gfc -ml-bd -mt-bd w-full-p sm:rounded-tr-lg'].join(' ')}>
				<div className="grid grid-cols-12">
					<div className={[styles.imageContainer, 'gf col-span-12 lg:col-span-6'].join(' ')}>
						<LoadingImage
							zoomable
							src="/images/LandscapeDetail02.jpg"
							quality={100}
							width={1246}
							height={660}
							objectFit="cover"
							alt=""
						/>
					</div>
					<div
						id="production-anchor"
						className={['gf col-span-12 md:col-span-6', 'gap-4 lg:grid-cols-5'].join(' ')}
					>
						<div className="sm:flex gap-4 items-center p-6 border-b border-primary">
							<h4 className="sm:inline text-2xl font-bold uppercase leading-6">
								{tHome('production.title')}
							</h4>
						</div>
						<p className={['lg:text-xl col-span-3 xl:col-span-5 p-6 pb-8'].join(' ')}>
							{tHome('production.text')}
						</p>
					</div>
					<div
						className={[styles.imageContainer, 'gf col-span-12 lg:col-span-6', 'md:order-4'].join(
							' '
						)}
					>
						<LoadingImage
							zoomable
							src="/images/LandscapeDetail03.jpg"
							quality={100}
							width={1246}
							height={660}
							objectFit="cover"
							alt=""
						/>
					</div>
					<div
						id="makeityourown-anchor"
						className={['gf col-span-12 md:col-span-6', 'gap-4 lg:grid-cols-5'].join(' ')}
					>
						<div className="sm:flex gap-4 items-center p-6 border-b border-primary">
							<h4 className="sm:inline text-2xl font-bold uppercase leading-6">
								{tHome('makeityourown.title')}
							</h4>
						</div>
						<p className={['lg:text-xl col-span-3 xl:col-span-5 p-6 pb-8'].join(' ')}>
							{tHome('makeityourown.text')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
