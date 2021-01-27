/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, FC } from 'react'
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

const PagePreviewZone: FC = ({ children }) => {
	const [previewBackground, setPreviewBackground] = useState<string>(checkerboard)
	return (
		<div
			className={`${previewBackground} relative grid content-center items-center justify-center h-full p-8`}
		>
			<nav className="absolute top-8 right-8">
				<ul>
					{[checkerboard, 'bg-secondary', 'bg-primary'].map((str) => (
						<li key={str}>
							<BackgroundButton
								onClick={() => setPreviewBackground(str)}
								background={str}
								borderClass={str === 'bg-primary' ? 'border-secondary' : undefined}
							/>
						</li>
					))}
				</ul>
			</nav>
			<div className="inline-block">{children}</div>
		</div>
	)
}

export default PagePreviewZone
