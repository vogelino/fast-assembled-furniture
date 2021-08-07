import { useRouter } from 'next/router'
import { FC, createContext, useState } from 'react'

type MenuLink = {
	id: string
	textId: string
}

type SecondaryMenuLink = {
	path: string
	textId: string
	active?: boolean
}

interface MenuContextType {
	menuLinks: MenuLink[]
	secondaryLinks: SecondaryMenuLink[]
	menuIsOpened: boolean
	openMenu: () => void
	closeMenu: () => void
	toggleMenu: () => void
}

const defaults = {
	menuLinks: [
		{
			id: 'introduction-anchor',
			textId: 'introduction.title',
		},
		{
			id: 'components-anchor',
			textId: 'components.title',
		},
		{
			id: 'assemblage-anchor',
			textId: 'assemblage.title',
		},
		{
			id: 'production-anchor',
			textId: 'production.title',
		},
		{
			id: 'makeityourown-anchor',
			textId: 'makeityourown.title',
		},
		{
			id: 'configurator-anchor',
			textId: 'configurator.title',
		},
	],
	secondaryLinks: [
		{
			path: '/imprint',
			textId: 'menu.imprint',
		},
		{
			path: '/data-privacy-guideline',
			textId: 'menu.data-privacy-guideline',
		},
	],
	menuIsOpened: false,
	openMenu: () => undefined,
	closeMenu: () => undefined,
	toggleMenu: () => undefined,
}

export const MenuContext = createContext<MenuContextType>(defaults)

export const MenuProvider: FC = ({ children }) => {
	const [state, setState] = useState(defaults)
	const router = useRouter()

	return (
		<MenuContext.Provider
			value={{
				...state,
				secondaryLinks: state.secondaryLinks.map((menuLink) => ({
					...menuLink,
					active: menuLink.path === router.asPath,
				})),
				openMenu: () => setState({ ...state, menuIsOpened: true }),
				closeMenu: () => setState({ ...state, menuIsOpened: false }),
				toggleMenu: () => setState({ ...state, menuIsOpened: !state.menuIsOpened }),
			}}
		>
			{children}
		</MenuContext.Provider>
	)
}
