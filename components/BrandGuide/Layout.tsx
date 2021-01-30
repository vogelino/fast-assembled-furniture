import { FC } from 'react'
import { pageTree } from '@components/BrandGuide/Menu'
import Sidebar from '@components/BrandGuide/Sidebar'
import Header from '@components/BrandGuide/Header'
import PageTextZone from '@components/BrandGuide/PageTextZone'
import PagePreviewZone, { PreviewOptionsType } from '@components/BrandGuide/PagePreviewZone'
import { PreviewStateProvider } from '@components/BrandGuide/PreviewStateContext'
import { BlockMapType } from 'react-notion'

const BrandGuide: FC<{
	notionContent: BlockMapType
	previewOptions?: PreviewOptionsType
}> = ({ notionContent, children, previewOptions }) => (
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
				<div className={`gf h-full inline-block ${children ? 'w-50-p' : 'w-full-p'}`}>
					<PageTextZone notionContent={notionContent} />
				</div>
				{children && (
					<div className="gf h-full inline-block w-50-p">
						<PagePreviewZone previewOptions={previewOptions}>{children}</PagePreviewZone>
					</div>
				)}
			</div>
		</div>
	</PreviewStateProvider>
)

export default BrandGuide
