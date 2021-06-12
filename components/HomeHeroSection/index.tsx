import { MenuContext } from '@components/MenuContext'
import Image from 'next/image'
import { FC, ReactPortal, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const HomeImage = (): ReactPortal | null => {
	const [container, setContainer] = useState<HTMLDivElement | null>(null)
	const { menuIsOpened } = useContext(MenuContext)

	useEffect(() => {
		if (typeof window === 'undefined') return
		const rootContainer = document.createElement('div')
		const parentElem = document.querySelector('#__next')
		if (!parentElem) return
		parentElem.prepend(rootContainer)
		setContainer(rootContainer)
	}, [])

	const element = (
		<div
			className={[
				menuIsOpened ? 'z-0' : 'z-20',
				'container',
				'fixed top-4 left-1/2 transform -translate-x-1/2 pl-56 sm:pl-72 lg:pl-96',
				'pointer-events-none mix-blend-luminosity fade-in text-right',
			].join(' ')}
		>
			<div className="transform translate-x-0 sm:translate-x-4 md:translate-x-8 lg:translate-x-24">
				<Image
					src="/images/HomeHeroImage.png"
					alt="An isometric view of the furniture"
					width={765}
					height={705}
				/>
			</div>
		</div>
	)

	return container ? createPortal(element, container, 'home-image') : null
}

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
		<HomeImage />
	</div>
)
