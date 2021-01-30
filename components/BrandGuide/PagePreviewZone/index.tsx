/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react'
import { BackgroundType, PreviewStateContext } from '@components/BrandGuide/PreviewStateContext'
import { checkerboard } from './PagePreviewZone.module.css'
import { identity } from '@utils/functionsUtil'
import { Button } from '@components/SquareButton'

export type PreviewOptionsType = {
	withBackgroundSelect?: boolean
	withResponsivePreview?: boolean
}

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

const BackgroundSelect: FC<{
	onClick: (enumStr: BackgroundType) => void
}> = ({ onClick }) => (
	<ul className="gf w-full-p grid place-content-center grid-flow-row gap-2 py-4">
		{Object.keys(previewBackgroundMap).map((enumStr: string) => {
			const backgroundClass = previewBackgroundMap[enumStr]
			return (
				<li key={enumStr} className="inline-block">
					<BackgroundButton
						onClick={() => onClick(enumStr as BackgroundType)}
						background={backgroundClass}
						borderClass={enumStr === 'Dark' ? 'border-secondary' : undefined}
					/>
				</li>
			)
		})}
	</ul>
)

const ResponsivePreviewSelect: FC = () => {
	const { isResponsive, setIsResponsive } = useContext(PreviewStateContext)
	return (
		<div className="w-full-p grid grid-flow-row">
			<Button
				type="button"
				icon="Maximize2"
				active={isResponsive}
				onClick={() => setIsResponsive(true)}
			>
				Respo
			</Button>
			<Button
				type="button"
				icon="Smartphone"
				active={!isResponsive}
				onClick={() => setIsResponsive(false)}
			>
				Mobil
			</Button>
		</div>
	)
}

const previewOptionsDefault = {
	withBackgroundSelect: true,
	withResponsivePreview: false,
}

const PagePreviewZone: FC<{
	previewOptions?: PreviewOptionsType
}> = ({ children, previewOptions = previewOptionsDefault }) => {
	const { isResponsive, previewBackground, setPreviewBackground } = useContext(PreviewStateContext)
	const mergedOptions = { ...previewOptionsDefault, ...previewOptions }
	const previewAddons = [
		mergedOptions.withBackgroundSelect && (
			<BackgroundSelect key="bgSelect" onClick={setPreviewBackground} />
		),
		mergedOptions.withResponsivePreview && <ResponsivePreviewSelect key="respPreview" />,
	].filter(identity)

	return (
		<div className="grid grid-cols-2 h-full-p w-full-p" style={{ gridTemplateColumns: '1fr 4rem' }}>
			<div
				className={`${previewBackgroundMap[previewBackground]} relative rounded-lg border-bd border-primary -mt-bd -ml-bd grid content-center items-center justify-center h-full-p p-8`}
			>
				{isResponsive ? (
					<div className="absolute top-8 left-8 bottom-8 right-8">
						<div className="relative w-full h-full grid place-content-center place-items-center">
							{children}
						</div>
					</div>
				) : (
					<div className="relative" style={{ width: 320, height: 449 }}>
						{children}
					</div>
				)}
			</div>
			<nav
				className="h-full grid grid-flow-row"
				style={{ gridTemplateRows: ` repeat(${previewAddons.length}, auto) 1fr` }}
			>
				{previewAddons}
				<div className="gf w-full-p h-full-fr" />
			</nav>
		</div>
	)
}

export default PagePreviewZone
