import React, { FC, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { MenuContext } from '@components/MenuContext'
import { PresetsSlider } from '@components/PresetsSlider'

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
					<PresetsSlider />
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
								<div className="image-container absolute inset-0">
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
