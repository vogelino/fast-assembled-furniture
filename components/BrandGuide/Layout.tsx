import React, { FC } from 'react'
import { pageTree } from '@/brand/Menu'
import Sidebar from '@/brand/Sidebar'
import Header from '@/brand/Header'
import PageTextZone from '@/brand/PageTextZone'
import PagePreviewZone from '@/brand/PagePreviewZone'
import { PreviewStateProvider } from '@/brand/PreviewStateContext'

const BrandGuide: FC<{ text?: string }> = ({ text = '', children }) => (
	<PreviewStateProvider>
		<div
			className="h-screen relative"
			style={{
				paddingLeft: 'calc(20rem - var(--borderWidth, 3px))',
				paddingTop: 'calc(4rem - var(--borderWidth, 3px))',
			}}
		>
			<Sidebar pageTree={pageTree} />
			<Header pageTree={pageTree} />
			<div className="gfc h-full-p">
				<div className="gf h-full inline-block w-50-p">
					<PageTextZone>{text}</PageTextZone>
				</div>
				<div className="gf h-full inline-block w-50-p">
					<PagePreviewZone>{children}</PagePreviewZone>
				</div>
			</div>
		</div>
	</PreviewStateProvider>
)

export default BrandGuide
