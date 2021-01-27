import React, { FC } from 'react'
import Layout from '../../../components/BrandGuide/Layout'
import { Button } from '../../../components/SquareButton'
import text from '../../../docs/brand/ui/buttons.md'

const BrandGuide: FC = () => (
	<Layout text={text}>
		<Button type="button">Menu</Button>
	</Layout>
)

export default BrandGuide
