import { CSSProperties, FC, HTMLProps } from 'react'
import { identity } from '@utils/functionsUtil'
import { Button } from '@components/SquareButton'
import styles from './BorderEdge.module.css'

const {
	containerClass,
	commonClass,
	TopLeftClass,
	TopRightClass,
	BottomLeftClass,
	BottomRightClass,
} = styles

type OrientationType = 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight'
type PositionType =
	| 'TopLeft'
	| 'TopRight'
	| 'BottomLeft'
	| 'BottomRight'
	| 'LeftTop'
	| 'LeftBottom'
	| 'RightTop'
	| 'RightBottom'

type BorderEdgeType = {
	orientation: OrientationType
	className?: string
	style?: CSSProperties
}

interface ButtonWithBorderEdgesPropType extends HTMLProps<HTMLButtonElement> {
	openings?: OrientationType[]
	edges?: Array<{
		position: PositionType
		orientation: OrientationType
	}>
	className?: string
	style?: CSSProperties
	status?: string | number
	icon?: string
	primary?: boolean
}

export const BorderEdge: FC<BorderEdgeType> = ({ orientation, style = {}, className = '' }) => (
	<span className={`${containerClass} ${className}`} style={style}>
		<span
			className={[
				commonClass,
				orientation === 'TopLeft' && TopLeftClass,
				orientation === 'TopRight' && TopRightClass,
				orientation === 'BottomLeft' && BottomLeftClass,
				orientation === 'BottomRight' && BottomRightClass,
			]
				.filter(identity)
				.join(' ')}
		/>
	</span>
)

const uPos = 'var(--borderWidth, 3px)'
const uNeg = 'calc(var(--borderWidth, 3px) * -1)'
export const ButtonWithBorderEdges: FC<ButtonWithBorderEdgesPropType> = ({
	openings = [],
	edges = [],
	className = '',
	children,
	style = {},
	primary = false,
	icon,
	status,
	...rest
}) => (
	<div className="inline-block relative -mt-bd -ml-bd">
		<div
			className={[
				'bg-primary overflow-hidden',
				...openings.map((opening) =>
					[
						opening === 'TopLeft' && 'rounded-tl-lg',
						opening === 'TopRight' && 'rounded-tr-lg',
						opening === 'BottomLeft' && 'rounded-bl-lg',
						opening === 'BottomRight' && 'rounded-br-lg',
					].filter(identity)
				),
				className,
			]
				.filter(identity)
				.join(' ')}
			style={style}
		>
			<Button
				{...rest}
				type="button"
				primary={primary}
				icon={icon}
				status={status}
				style={{ margin: 0 }}
			>
				{children}
			</Button>
		</div>
		{edges.map(({ position, orientation }) => (
			<BorderEdge
				key={`${position}-${orientation}`}
				orientation={orientation}
				className={[
					'absolute',
					position === 'TopLeft' && '-top-6 left-0',
					position === 'TopRight' && '-top-6 right-0',
					position === 'BottomLeft' && 'left-0 -bottom-6',
					position === 'BottomRight' && 'right-0 -bottom-6',
					position === 'LeftTop' && '-left-6 top-0',
					position === 'LeftBottom' && '-left-6 bottom-0',
					position === 'RightTop' && '-right-6 top-0',
					position === 'RightBottom' && '-right-6 bottom-0',
				]
					.filter(identity)
					.join(' ')}
				style={{
					transform: `translate(${
						(position.startsWith('Left') && uPos) || (position.startsWith('Right') && uNeg) || 0
					}, ${
						(position.startsWith('Top') && uPos) || (position.startsWith('Bottom') && uNeg) || 0
					})`,
				}}
			/>
		))}
	</div>
)
