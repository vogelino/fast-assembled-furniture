import { useContext, FC } from 'react'
import Image from 'next/image'
import { RawHomePage } from '@utils/graphcmsUtil'
import { ColorThemeContext } from '@components/ColorThemeContext'
import { isDarkTheme } from '@utils/themeUtil'

export const TransparentBoxes: FC<RawHomePage> = ({ shelveIcon }) => {
	const { themeKey } = useContext(ColorThemeContext)
	const isDark = isDarkTheme(themeKey)

	return (
		<>
			<div className="relative gf row-span-2 grid place-items-center place-content-center p-8">
				<Image src={shelveIcon.url} width={100} height={100} layout="fixed" />
				<div
					className="absolute top-0 right-0 bottom-0 left-0 bg-primary rounded"
					style={{ mixBlendMode: isDark ? 'difference' : 'lighten' }}
				/>
			</div>
			<div className="gft row-span-2"></div>
			<div className="gft col-span-2 row-span-2"></div>
		</>
	)
}
