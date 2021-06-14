import { FC } from 'react'
import Image from 'next/image'
import { ButtonWithBorderEdges } from '@components/BorderEdge'

interface PresetsSliderButtonPropType {
	imageUrl: string
	next?: boolean
	onClick?: () => void
}

const presetsSliderButtonOverlayStyles = [
	'absolute inset-0 bg-primary50 z-10',
	'transition-opacity opacity-0 group-hover:opacity-100 group-focus:opacity-100',
]

export const PresetsSliderButton: FC<PresetsSliderButtonPropType> = ({
	imageUrl,
	next = false,
	onClick = () => undefined,
}) => (
	<div
		className="gf relative hidden sm:block group focus:outline-none"
		role="button"
		onClick={onClick}
		tabIndex={0}
		onKeyPress={(e) => {
			if (e.key !== 'Enter') return
			onClick()
		}}
	>
		<div className={presetsSliderButtonOverlayStyles.concat('mix-blend-multiply').join(' ')} />
		<div className={presetsSliderButtonOverlayStyles.concat('mix-blend-color').join(' ')} />
		<div
			className={`image-container absolute inset-0 pr-6 pb-6 pl-14 pt-14 mix-blend-luminosity`}
			style={{ transform: next ? 'scaleX(-1)' : 'scaleX(1)' }}
		>
			<Image src={imageUrl} width={300} height={300} objectFit="contain" />
		</div>
		<div className={next ? 'absolute top-0 -right-bd' : ''}>
			<ButtonWithBorderEdges
				tabIndex={-1}
				edges={
					next
						? [
								{ position: 'BottomRight', orientation: 'TopRight' },
								{ position: 'LeftTop', orientation: 'TopRight' },
						  ]
						: [
								{ position: 'BottomLeft', orientation: 'TopLeft' },
								{ position: 'RightTop', orientation: 'TopLeft' },
						  ]
				}
				openings={[next ? 'BottomLeft' : 'BottomRight']}
				icon={next ? 'ArrowRight' : 'ArrowLeft'}
			>
				{next ? 'Next' : 'Prev'}
			</ButtonWithBorderEdges>
		</div>
	</div>
)
