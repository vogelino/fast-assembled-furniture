import { ButtonWithBorderEdges } from '@components/BorderEdge'
import { Button } from '@components/SquareButton'
import { FC } from 'react'
import styles from './HomeMasonryGrid.module.css'

export const HomeMasonryGrid: FC = () => (
	<>
		<div>
			<div className={[styles.buttonsContainer, 'inline-flex bg-primary'].join(' ')}>
				<Button type="button" colorType="Buy">
					Buy <span className="text-sm font-normal">(123€)</span>
				</Button>
				<ButtonWithBorderEdges
					edges={[{ position: 'RightBottom', orientation: 'BottomLeft' }]}
					openings={['TopRight']}
					colorType="Edit"
				>
					Customize
				</ButtonWithBorderEdges>
			</div>
		</div>
		<div className="gfc -ml-bd -mt-bd w-full-p">
			<div className="gf h-96"></div>
		</div>
	</>
)
