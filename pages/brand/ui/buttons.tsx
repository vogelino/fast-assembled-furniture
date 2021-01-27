import { FC } from 'react'
import Layout from '@/brand/Layout'
import { Button } from '@/components/SquareButton'
import text from '@/docs/brand/ui/buttons.md'

const BrandGuide: FC = () => (
	<Layout text={text}>
		<Button type="button" icon="Calendar">
			Menu
		</Button>
	</Layout>
)

export default BrandGuide
