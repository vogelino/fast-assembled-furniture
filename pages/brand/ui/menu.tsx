import { FC } from 'react'
import Layout from '@/brand/Layout'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import { getNotionPage } from '@/utils/notionUtil'

export const getStaticProps = getNotionPage('46ec0392bd734685b96bfb5a9ae3dc96')

const MenuGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap}>
		<div className="grid grid-cols-4 gap-8" />
	</Layout>
)

export default MenuGuide
