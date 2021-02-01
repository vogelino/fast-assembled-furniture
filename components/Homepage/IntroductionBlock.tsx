import { FC } from 'react'
import { RawHomePage } from '@utils/graphcmsUtil'
import { ButtonWithBorderEdges } from '@components/BorderEdge'

export const IntroductionBlock: FC<RawHomePage> = ({ displayTitle, introductionText }) => (
	<div className="relative p-8 gf col-span-2 row-span-4">
		<h1 className="mb-4 text-4xl font-bold uppercase leading-11">
			{displayTitle.split(' ').map((txt: string) => (
				<span className="block" key={txt}>
					{txt}
				</span>
			))}
		</h1>
		<p className="text-2xl">{introductionText}</p>
		<div className="absolute top-0 inline-grid grid-cols-2 gap-0 -right-bd">
			<ButtonWithBorderEdges
				openings={['BottomLeft']}
				edges={[
					{ position: 'BottomRight', orientation: 'TopRight' },
					{ position: 'LeftTop', orientation: 'TopRight' },
				]}
				icon="Edit"
				colorType="Edit"
			>
				Edit
			</ButtonWithBorderEdges>
			<ButtonWithBorderEdges icon="Info" colorType="Info" className="ml-0">
				Info
			</ButtonWithBorderEdges>
			<span />
			<ButtonWithBorderEdges
				openings={['BottomLeft']}
				edges={[{ position: 'BottomRight', orientation: 'TopRight' }]}
				icon="Plus"
				colorType="Add"
			>
				Add
			</ButtonWithBorderEdges>
		</div>
	</div>
)
