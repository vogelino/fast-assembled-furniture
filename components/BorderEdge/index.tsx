import { CSSProperties, FC } from 'react'
import { identity } from '@utils/functionsUtil'
import { Button, ButtonProps } from '@components/SquareButton'
import {
	containerClass,
	commonClass,
	TopLeftClass,
	TopRightClass,
	BottomLeftClass,
	BottomRightClass,
} from './BorderEdge.module.css'

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

interface ButtonWithBorderEdgesPropType extends Omit<ButtonProps, 'type'> {
	openings?: OrientationType[]
	edges?: Array<{
		position: PositionType
		orientation: OrientationType
	}>
	colorType?: 'Edit' | 'Add' | 'Info' | 'Buy'
	type?: 'button' | 'submit' | 'reset'
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

export const ButtonWithBorderEdges: FC<ButtonWithBorderEdgesPropType> = ({
	openings = [],
	edges = [],
	className = '',
	children,
	style = {},
	colorType,
	icon,
	status,
	type = 'button',
	onClick = () => undefined,
	...rest
}) => (
	<div className="inline-block relative -mt-bd -ml-bd w-full-p">
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
				type={type}
				colorType={colorType}
				icon={icon}
				status={status}
				style={{ margin: 0 }}
				onClick={onClick}
				className="w-full"
				{...rest}
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
						(position.startsWith('Left') && 3) || (position.startsWith('Right') && -3) || 0
					}px, ${
						(position.startsWith('Top') && 3) || (position.startsWith('Bottom') && -3) || 0
					}px)`,
				}}
			/>
		))}
	</div>
)
