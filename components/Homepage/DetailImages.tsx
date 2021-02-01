import { FC, useContext } from 'react'
import Image from 'next/image'
import { RawHomePage } from '@utils/graphcmsUtil'
import { ColorThemeContext } from '@components/ColorThemeContext'
import { isDarkTheme } from '@utils/themeUtil'

export const DetailImages: FC<RawHomePage> = ({ detailImages }) => {
	const { themeKey } = useContext(ColorThemeContext)
	const isDark = isDarkTheme(themeKey)

	const rest = detailImages.length % 2
	const lastIndex = detailImages.length - rest
	const evenArray = detailImages.slice(0, lastIndex)

	return (
		<>
			{evenArray.map((detailImage) => (
				<div
					className="overflow-hidden rounded-lg -mt-bd -ml-bd row-span-2 bg-primary framed"
					key={detailImage?.id}
				>
					<Image
						src={detailImage?.url}
						width={400}
						height={400}
						layout="responsive"
						objectFit="cover"
						className={`overflow-hidden rounded-lg ${
							isDark ? 'blend-multiply' : 'blend-screen'
						} hover:blend-normal`}
					/>
				</div>
			))}
		</>
	)
}
