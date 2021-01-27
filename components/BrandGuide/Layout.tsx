import React, { FC } from 'react'
import { pageTree } from './Menu'
import Sidebar from './Sidebar'
import Header from './Header'

const BrandGuide: FC = ({ children }) => (
	<div
		className="h-screen relative"
		style={{
			paddingLeft: 'calc(20rem - var(--borderWidth, 3px))',
			paddingTop: 'calc(4rem - var(--borderWidth, 3px))',
		}}
	>
		<Sidebar pageTree={pageTree} />
		<Header pageTree={pageTree} />
		<div className="gfc h-full">
			<div className="gf h-full">{children}</div>
		</div>
	</div>
)

export default BrandGuide
