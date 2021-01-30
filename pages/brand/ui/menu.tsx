import React, { FC } from 'react'
import Layout from '@components/BrandGuide/Layout'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import { getNotionPage } from '@utils/notionUtil'
import Menu from '@components/Header'

export const getStaticProps = getNotionPage('46ec0392bd734685b96bfb5a9ae3dc96')

const MenuGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap} previewOptions={{ withResponsivePreview: true }}>
		<div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
			<Menu />
		</div>
	</Layout>
)

export default MenuGuide
