import { ButtonWithBorderEdges } from '@components/BorderEdge'
import { FC, ReactNode, useState } from 'react'
import styles from './TabbedBlock.module.css'

interface TabType {
	id: string
	title: string
	content: ReactNode
}

interface TabsPropType {
	id?: string
	tabsParentClassName?: string
	wrapperClassName?: string
	contentClassName?: string
	tabs: TabType[]
}

interface TabbedBlockTabsPropType
	extends Omit<TabsPropType, 'wrapperClassName' | 'contentClassName'> {
	onTabChange: (tabIdx: number) => void
	activeTabIndex: number
}

export const TabbedBlockTabs: FC<TabbedBlockTabsPropType> = ({
	tabs,
	onTabChange,
	activeTabIndex,
	tabsParentClassName = '',
}) => (
	<div
		className={['absolute top-0 transform -translate-y-full flex', tabsParentClassName].join(' ')}
	>
		{tabs.map(({ id, title }, idx) => (
			<ButtonWithBorderEdges
				key={id}
				onClick={() => onTabChange(idx)}
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
)

export const TabbedBlock: FC<TabsPropType> = ({
	tabs,
	tabsParentClassName = '',
	wrapperClassName = '',
	contentClassName = '',
	id = '',
}) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0)

	return (
		<div className={['relative w-full', wrapperClassName].join(' ')} id={id}>
			<div className={['gf', contentClassName, styles.tabBlock].join(' ')}>
				{tabs[activeTabIndex].content}
			</div>
			<TabbedBlockTabs
				tabsParentClassName={tabsParentClassName}
				tabs={tabs}
				onTabChange={(idx) => setActiveTabIndex(idx)}
				activeTabIndex={activeTabIndex}
			/>
		</div>
	)
}
