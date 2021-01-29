import React, { FC } from 'react'
import Layout from '@components/Layout'

const Grid: FC = () => (
	<Layout>
		<div className="gfc grid grid-cols-4">
			<div className="gf">Hello</div>
			<div className="gf">Hello</div>
			<div className="gf">Hello</div>
			<div className="gf">Hello</div>
		</div>
	</Layout>
)
export default Grid
