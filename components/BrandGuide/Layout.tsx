import React, { FC } from 'react'
import Sidebar from './Sidebar'

const BrandGuide: FC = ({ children }) => (
	<div
		className="h-screen relative"
		style={{ paddingLeft: 'calc(20rem - var(--borderWidth, 3px))' }}
	>
		<Sidebar />
		<div className="gfc h-full">
			<div className="gf h-full">{children}</div>
		</div>
	</div>
)

export default BrandGuide
