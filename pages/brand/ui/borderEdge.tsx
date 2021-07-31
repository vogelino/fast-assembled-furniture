import React, { FC } from 'react'
import { NotionRendererProps } from 'react-notion/dist/renderer'
import Layout from '@components/BrandGuide/Layout'
import { getNotionPage } from '@utils/notionUtil'
import { BorderEdge, ButtonWithBorderEdges } from '@components/BorderEdge'

export const getStaticProps = getNotionPage('c10f61d4edc44070a4d3d34793526345')

const MenuGuide: FC<Pick<NotionRendererProps, 'blockMap'>> = ({ blockMap }) => (
	<Layout notionContent={blockMap}>
		<div className="w-80 h-80 relative border-bd">
			<div className="absolute top-0 right-0 bottom-0 left-0 grid place-content-center place-items-center">
				<div className="inline-grid grid-cols-2 gap-8">
					<BorderEdge orientation={'TopLeft' as const} />
					<BorderEdge orientation={'TopRight' as const} />
					<BorderEdge orientation={'BottomLeft' as const} />
					<BorderEdge orientation={'BottomRight' as const} />
				</div>
			</div>
			<div className="inline-grid grid-cols-2 gap-0 absolute top-0 left-0">
				<ButtonWithBorderEdges icon="Info" className="ml-0">
					Info
				</ButtonWithBorderEdges>
				<ButtonWithBorderEdges
					openings={['BottomRight']}
					edges={[
						{ position: 'RightTop', orientation: 'TopLeft' },
						{ position: 'BottomLeft', orientation: 'TopLeft' },
					]}
					icon="Edit"
				>
					Edit
				</ButtonWithBorderEdges>
				<ButtonWithBorderEdges
					openings={['BottomRight']}
					edges={[{ position: 'BottomLeft', orientation: 'TopLeft' }]}
					icon="Plus"
					primary
				>
					Add
				</ButtonWithBorderEdges>
			</div>
			<div className="inline-grid grid-cols-2 gap-0 absolute top-0 -right-bd">
				<ButtonWithBorderEdges
					openings={['BottomLeft']}
					edges={[
						{ position: 'BottomRight', orientation: 'TopRight' },
						{ position: 'LeftTop', orientation: 'TopRight' },
					]}
					icon="Edit"
				>
					Edit
				</ButtonWithBorderEdges>
				<ButtonWithBorderEdges icon="Info" className="ml-0">
					Info
				</ButtonWithBorderEdges>
				<span />
				<ButtonWithBorderEdges
					openings={['BottomLeft']}
					edges={[{ position: 'BottomRight', orientation: 'TopRight' }]}
					icon="Plus"
					primary
				>
					Add
				</ButtonWithBorderEdges>
			</div>
			<div className="inline-grid grid-cols-2 gap-0 absolute -bottom-bd left-0">
				<ButtonWithBorderEdges
					openings={['TopRight']}
					edges={[
						{ position: 'TopLeft', orientation: 'BottomLeft' },
						{ position: 'RightBottom', orientation: 'BottomLeft' },
					]}
					icon="Edit"
				>
					Edit
				</ButtonWithBorderEdges>
				<span />
				<ButtonWithBorderEdges icon="Info" className="ml-0">
					Info
				</ButtonWithBorderEdges>
				<ButtonWithBorderEdges
					openings={['TopRight']}
					edges={[{ position: 'RightBottom', orientation: 'BottomLeft' }]}
					icon="Plus"
					primary
				>
					Add
				</ButtonWithBorderEdges>
			</div>
			<div className="inline-grid grid-cols-2 gap-0 absolute -bottom-bd -right-bd">
				<span />
				<ButtonWithBorderEdges
					openings={['TopLeft']}
					edges={[
						{ position: 'TopRight', orientation: 'BottomRight' },
						{ position: 'LeftBottom', orientation: 'BottomRight' },
					]}
					icon="Edit"
				>
					Edit
				</ButtonWithBorderEdges>
				<ButtonWithBorderEdges
					openings={['TopLeft']}
					edges={[{ position: 'LeftBottom', orientation: 'BottomRight' }]}
					icon="Plus"
					primary
				>
					Add
				</ButtonWithBorderEdges>
				<ButtonWithBorderEdges icon="Info" className="ml-0">
					Info
				</ButtonWithBorderEdges>
			</div>
		</div>
	</Layout>
)

export default MenuGuide
