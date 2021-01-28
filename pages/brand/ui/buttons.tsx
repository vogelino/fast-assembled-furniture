import { FC } from 'react'
import Layout from '@/brand/Layout'
import { Button } from '@/components/SquareButton'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import { getNotionPage } from '@/utils/notionUtil'

export const getStaticProps = getNotionPage('15857cee480e4abe95c8d2c25dce3ebb')

const BrandGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap}>
		<Button type="button" icon="Calendar">
			Menu
		</Button>
	</Layout>
)

export default BrandGuide
