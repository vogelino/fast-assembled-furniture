import { FC } from 'react'
import Layout from '@/brand/Layout'
import { Button } from '@/components/SquareButton'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import { getNotionPage } from '@/utils/notionUtil'

export const getStaticProps = getNotionPage('15857cee480e4abe95c8d2c25dce3ebb')

const ButtonsGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap}>
		<div className="grid grid-cols-4 gap-8">
			<Button type="button" icon="Menu">
				Menu
			</Button>
			<Button type="button" icon="X">
				Close
			</Button>
			<Button type="button" icon="ArrowLeft">
				Prev
			</Button>
			<Button type="button" icon="ShoppingCart" status="2">
				Cart
			</Button>
			<Button type="button" icon="Info" colorType={'Info' as const}>
				Info
			</Button>
			<Button type="button" icon="Edit" colorType={'Edit' as const}>
				Edit
			</Button>
			<Button type="button" icon="Plus" colorType={'Add' as const}>
				Add
			</Button>
			<Button type="button" icon="DollarSign" colorType={'Buy' as const}>
				Buy
			</Button>
			<Button type="button" icon="ArrowLeft" className="col-span-2">
				Customize <span className="font-normal">(€)</span>
			</Button>
			<Button type="button" className="col-span-2" colorType={'Buy' as const}>
				Buy <span className="text-sm font-normal">(599€)</span>
			</Button>
		</div>
	</Layout>
)

export default ButtonsGuide
