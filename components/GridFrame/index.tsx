import React, { FC } from 'react'
import { gridFrame, gridFrameContent } from './gridframe.module.css'

export const GridFrame: FC<{
	className?: string
}> = ({ children, className }) => (
	<div className={gridFrame}>
		<div className={`${gridFrameContent} ${className || ''}`}>{children}</div>
	</div>
)

export const GridFrameContainer: FC<{
	className?: string
}> = ({ className, children }) => (
	<div
		className={`overflow-hidden rounded-lg ${className || ''}`}
		style={{
			paddingLeft: 'var(--borderWidth, 3px)',
			paddingTop: 'var(--borderWidth, 3px)',
		}}
	>
		{children}
	</div>
)
