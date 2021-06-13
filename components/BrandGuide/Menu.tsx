import { FC } from 'react'
import ActiveLink from '@components/Link'

export type MenuItemType = {
	title: string
	path: string
	children?: MenuItemType[]
}

export type PageTreeType = MenuItemType[]
export const pageTree: PageTreeType = [
	{
		title: 'Welcome',
		path: '/brand',
	},
	{
		title: 'Corporate Identity',
		path: '/brand/ci',
		children: [
			{
				title: 'Logo',
				path: '/brand/ci/logo',
				children: [
					{
						title: `Dos and Don'ts`,
						path: `/brand/ci/logo/dos-and-donts`,
					},
				],
			},
		],
	},
	{
		title: 'UI components',
		path: '/brand/ui',
		children: [
			{
				title: 'Frame',
				path: '/brand/ui/frame',
			},
			{
				title: 'Buttons',
				path: '/brand/ui/buttons',
			},
			{
				title: 'Menu',
				path: '/brand/ui/menu',
			},
			{
				title: 'Border Edge',
				path: '/brand/ui/borderEdge',
			},
		],
	},
]

const getClassesByLevel = (level = 0): { [level: string]: string } => {
	const linkCommon = `transition-opacity inline-block`
	const linkCommonActive = `cursor-default line-through`
	const linkCommonInactive = `hover:opacity-50 cursor-pointer`
	return [
		{
			linkCommonClasses: `${linkCommon} uppercase`,
			linInactiveClasses: `${linkCommonInactive} font-bold`,
			linkActiveClasses: `${linkCommonActive} font-normal`,
		},
		{
			linkCommonClasses: `${linkCommon}`,
			linInactiveClasses: `${linkCommonInactive}`,
			linkActiveClasses: `${linkCommonActive}`,
		},
	][level === 0 ? 0 : 1]
}

function getChildMapper(level = 0): (linkItem: MenuItemType) => JSX.Element {
	const Tag = (level === 0 ? 'h3' : 'span') as keyof JSX.IntrinsicElements

	const { linkCommonClasses, linkActiveClasses, linInactiveClasses } = getClassesByLevel(level)

	// eslint-disable-next-line react/display-name
	return (linkItem: MenuItemType) => {
		return (
			<li className={`${level === 0 ? 'gf px-4 py-6' : 'py-0 px-6'} relative`} key={linkItem.title}>
				{level > 0 && <span className="absolute top-0 left-0 opacity-25">→</span>}
				<ActiveLink
					href={linkItem.path}
					locale="en"
					className={linkCommonClasses}
					inactiveClassName={linInactiveClasses}
					activeClassName={linkActiveClasses}
				>
					<Tag>{linkItem.title}</Tag>
				</ActiveLink>
				{linkItem.children && (
					<ul className={`top-full ${level === 0 ? 'mt-1' : ''}`}>
						{linkItem.children.map(getChildMapper(level + 1))}
					</ul>
				)}
			</li>
		)
	}
}

const Menu: FC<{ pageTree: PageTreeType }> = ({ pageTree: localPageTree }) => (
	<ul className="w-full-p bg-primary">{localPageTree.map(getChildMapper())}</ul>
)

export default Menu
