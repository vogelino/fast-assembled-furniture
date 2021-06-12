import { FC } from 'react'

export const HomeHeroSection: FC = () => (
	<div className="py-8 sm:py-12 px-4 sm:px-0 relative">
		<div
			className={[
				'text-4xl sm:text-7xl md:text-8xl lg:text-9xl uppercase',
				'font-semibold sm:font-medium md:font-normal',
			].join(' ')}
			style={{ lineHeight: '.9em' }}
		>
			Fast
			<br />
			Assembled
			<br />
			Furniture
		</div>
		<img src="/images/HomeHeroImage.png" alt="An isometric view of the furniture" />
	</div>
)
