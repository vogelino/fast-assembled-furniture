/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react'
import { BackgroundType, PreviewStateContext } from '../PreviewStateContext'
import { checkerboard } from './PagePreviewZone.module.css'

const BackgroundButton: FC<{
	onClick: () => void
	borderClass?: string
	background: string
}> = ({ onClick, borderClass = 'border-primary', background }) => (
	<button
		type="button"
		onClick={onClick}
		className={`${background} w-8 h-8 inline-block rounded-full focus:outline-none focus:ring-4 border-2 ${borderClass}`}
	/>
)

const previewBackgroundMap = {
	[BackgroundType.Transparent as string]: checkerboard,
	[BackgroundType.Light as string]: 'bg-secondary',
	[BackgroundType.Dark as string]: 'bg-primary',
}

const PagePreviewZone: FC = ({ children }) => {
	const { previewBackground, setPreviewBackground } = useContext(PreviewStateContext)
	return (
		<div
			className={`${previewBackgroundMap[previewBackground]} relative grid content-center items-center justify-center h-full p-8`}
		>
			<nav className="absolute top-8 right-8">
				<ul>
					{Object.keys(previewBackgroundMap).map((enumStr: string) => {
						const backgroundClass = previewBackgroundMap[enumStr]
						return (
							<li key={enumStr}>
								<BackgroundButton
									onClick={() => setPreviewBackground(enumStr as BackgroundType)}
									background={backgroundClass}
									borderClass={enumStr === 'Dark' ? 'border-secondary' : undefined}
								/>
							</li>
						)
					})}
				</ul>
			</nav>
			<div className="inline-block">{children}</div>
		</div>
	)
}

export default PagePreviewZone
