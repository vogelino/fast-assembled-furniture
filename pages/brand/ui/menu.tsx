import React, { FC } from 'react'
import Layout from '@components/BrandGuide/Layout'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import { getNotionPage } from '@utils/notionUtil'
import Menu from '@components/Header'

export const getStaticProps = getNotionPage('46ec0392bd734685b96bfb5a9ae3dc96')

const MenuGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap}>
		<div className="absolute top-8 right-24 bottom-8 left-8">
			<div className="relative w-full h-full overflow-hidden rounded-md">
				<Menu />
			</div>
		</div>
	</Layout>
)

export default MenuGuide
