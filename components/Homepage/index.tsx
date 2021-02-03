import React, { FC, useContext } from 'react'

import { ColorThemeContext } from '@components/ColorThemeContext'
import { RawHomePage } from '@utils/graphcmsUtil'
import { isDarkTheme } from '@utils/themeUtil'

import { DetailImages } from './DetailImages'
import { IntroductionBlock } from './IntroductionBlock'
import { SecondaryBlock } from './SecondaryBlock'
import { TransparentBoxes } from './TransparentBoxes'

export const Homepage: FC<RawHomePage> = (props) => {
	const { themeKey } = useContext(ColorThemeContext)
	const isDark = isDarkTheme(themeKey)

	return (
		<div className="h-full grid grid-cols-6">
			<div className="relative h-full col-span-2 framed">
				<div
					className="h-screen overflow-x-hidden overflow-y-auto bg-center bg-no-repeat bg-cover gfc"
					style={{
						backgroundImage: `url(${props.backgroundImage?.url})`,
						backgroundBlendMode: isDark ? 'multiply' : 'screen',
					}}
				>
					<div className="grid grid-cols-2" style={{ gridAutoRows: '7vw' }}>
						<IntroductionBlock {...props} />
						<DetailImages {...props} />
						<SecondaryBlock {...props} />
						<TransparentBoxes {...props} />
						<div className="gf col-span-2 row-span-1"></div>
					</div>
				</div>
			</div>
			{props.mainGallery.length >= 3 && (
				<div
					className="h-full gf col-span-4 bg-cover bg-center"
					style={{ marginTop: 0, backgroundImage: `url(${props.mainGallery[2].url})` }}
				></div>
			)}
		</div>
	)
}
