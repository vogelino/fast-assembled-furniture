import { FC } from 'react'
import Layout from '@components/BrandGuide/Layout'
import { Button } from '@components/SquareButton'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import { getNotionPage } from '@utils/notionUtil'

export const getStaticProps = getNotionPage('15857cee480e4abe95c8d2c25dce3ebb')

const ButtonsGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap}>
		<div className="grid grid-cols-4 gap-8">
			<Button type="button" icon="Menu" />
			<Button type="button" icon="X" />
			<Button type="button" icon="ArrowLeft" />
			<Button type="button" icon="ShoppingCart" status="2">
				Cart
			</Button>
			<Button type="button" icon="Info" />
			<Button type="button" icon="Edit" />
			<Button type="button" icon="Plus" />
			<Button type="button" icon="DollarSign" />
			<Button type="button" className="col-span-2">
				Customize
			</Button>
			<Button type="button" className="col-span-2" primary>
				Buy <span className="text-sm font-normal">(599€)</span>
			</Button>
		</div>
	</Layout>
)

export default ButtonsGuide
