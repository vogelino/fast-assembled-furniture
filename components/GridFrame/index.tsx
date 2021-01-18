import React, { FC } from 'react'
import { gridFrame } from './gridframe.module.css'

const GridFrame: FC<{
	className?: string
}> = ({ children, className }) => (
	<>
		<div className={`${gridFrame} ${className || ''}`}>{children}</div>
	</>
)

export default GridFrame
