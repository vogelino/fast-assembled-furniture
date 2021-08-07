import { ButtonWithBorderEdges } from '@components/BorderEdge'
import Image from 'next/image'
import { FC, useState } from 'react'
import styles from './TabbedBlock.module.css'

interface TabType {
	id: string
	title: string
	text: string
	img: string
}

interface TabsPropType {
	id?: string
	className?: string
	tabs: TabType[]
}

export const TabbedBlock: FC<TabsPropType> = ({ tabs, className = '', id = '' }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0)

	return (
		<div className="relative flex" id={id}>
			<div className={['gf', className, styles.tabBlock].join(' ')}>
				<div className="absolute top-0 transform -translate-y-full flex">
					{tabs.map(({ id, title }, idx) => (
						<ButtonWithBorderEdges
							key={id}
							onClick={() => setActiveTabIndex(idx)}
							type="button"
							asTab
							primary={activeTabIndex !== idx}
							openings={['TopLeft', 'TopRight']}
							edges={[
								idx === tabs.length - 1 && {
									position: 'RightBottom',
									orientation: 'BottomLeft',
								},
							]}
						>
							{title}
						</ButtonWithBorderEdges>
					))}
				</div>
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
					<p className="lg:text-xl p-6 pb-8">{tabs[activeTabIndex].text}</p>
					<Image
						src={`/images/${tabs[activeTabIndex].img}`}
						alt={`An isolated view of the ${tabs[activeTabIndex].title}`}
						width={530}
						height={324}
						objectFit="contain"
						quality={100}
						objectPosition="right"
					/>
				</div>
			</div>
		</div>
	)
}
