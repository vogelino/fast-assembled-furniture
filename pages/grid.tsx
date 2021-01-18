import React, { FC } from 'react'
import Layout from '../components/Layout'
import { GridFrame, GridFrameContainer } from '../components/GridFrame'

const Grid: FC<{}> = ({}) => (
	<Layout>
		<GridFrameContainer className="grid grid-cols-4">
			<GridFrame>Hello</GridFrame>
			<GridFrame>Hello</GridFrame>
			<GridFrame>Hello</GridFrame>
			<GridFrame>Hello</GridFrame>
		</GridFrameContainer>
	</Layout>
)
export default Grid
