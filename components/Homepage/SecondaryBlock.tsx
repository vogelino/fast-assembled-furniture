import { FC } from 'react'
import { RawHomePage } from '@utils/graphcmsUtil'
import { ButtonWithBorderEdges } from '@components/BorderEdge'

export const SecondaryBlock: FC<RawHomePage> = ({ secondaryTitle, secondaryText }) => (
	<div className="relative p-8 pl-24 gf col-span-2 row-span-4">
		<h1 className="mb-4 text-4xl font-bold uppercase leading-11">
			{secondaryTitle.split(' ').map((txt: string) => (
				<span className="block" key={txt}>
					{txt}
				</span>
			))}
		</h1>
		<p className="text-2xl">{secondaryText}</p>
		<div className="absolute top-0 left-0 inline-grid grid-cols-1 gap-0">
			<ButtonWithBorderEdges
				edges={[{ position: 'RightTop', orientation: 'TopLeft' }]}
				icon="HelpCircle"
				colorType="Info"
			>
				How
			</ButtonWithBorderEdges>
			<ButtonWithBorderEdges icon="Settings" colorType="Edit" className="ml-0">
				Conf
			</ButtonWithBorderEdges>
			<ButtonWithBorderEdges
				openings={['BottomRight']}
				edges={[{ position: 'BottomLeft', orientation: 'TopLeft' }]}
				icon="ShoppingCart"
				colorType="Add"
			>
				Get
			</ButtonWithBorderEdges>
		</div>
	</div>
)
