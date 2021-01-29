import { FC } from 'react'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import Layout from '@components/BrandGuide/Layout'
import { getNotionPage } from '@utils/notionUtil'

export const getStaticProps = getNotionPage('db31dff4705d4a73894a83971aad95f4')

const BrandGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap} />
)

export default BrandGuide