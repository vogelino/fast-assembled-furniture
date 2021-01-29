import { FC } from 'react'
import { BlockMapType } from 'react-notion/dist/types'
import { NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

export type PageTextZonePropsType = {
	notionContent: BlockMapType
}

const PageTextZone: FC<PageTextZonePropsType> = ({ notionContent }) => (
	<div className="p-8 pb-40 h-screen overflow-y-auto">
		<div className="max-w-5xl mx-auto">
			<NotionRenderer blockMap={notionContent} />
		</div>
	</div>
)

export default PageTextZone
