import { FC } from 'react'
import { BorderEdge } from '@components/BorderEdge'
import styles from './PageFrame.module.css'

export const PageFrame: FC = () => (
	<div
		className={[
			styles.container,
			'fixed pointer-events-none inset-0 page-edges z-50 rounded-lg border-bd border-primary',
		].join(' ')}
	>
		<div className="relative w-full h-full">
			<BorderEdge
				orientation={'TopLeft' as const}
				className="absolute pointer-events-none -top-bd -left-bd"
			/>
			<BorderEdge
				orientation={'TopRight' as const}
				className="absolute pointer-events-none -top-bd -right-bd"
			/>
			<BorderEdge
				orientation={'BottomRight' as const}
				className="absolute pointer-events-none -bottom-bd -right-bd"
			/>
			<BorderEdge
				orientation={'BottomLeft' as const}
				className="absolute pointer-events-none -bottom-bd -left-bd"
			/>
		</div>
	</div>
)
