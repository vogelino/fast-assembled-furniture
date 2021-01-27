import React, { FC } from 'react'
import Layout from '@/brand/Layout'
import Button from '@/components/Button'
import text from '@/docs/brand/ci/logo/dos-and-donts.md'

const BrandGuide: FC = () => (
	<Layout text={text}>
		<Button type="button">Click me</Button>
	</Layout>
)

export default BrandGuide
