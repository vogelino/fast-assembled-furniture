import { useRouter } from 'next/router'
import { FC, createContext, useState } from 'react'

type MenuLink = {
	path: string
	textId: string
	active?: boolean
}

interface MenuContextType {
	menuLinks: MenuLink[]
	secondaryLinks: MenuLink[]
	menuIsOpened: boolean
	openMenu: () => void
	closeMenu: () => void
	toggleMenu: () => void
}

const defaults = {
	menuLinks: [
		{
			path: '/',
			textId: 'menu.home',
		},
		{
			path: '/faf-product-faf-shelve-a32s',
			textId: 'menu.faf-product-faf-shelve-a32s',
		},
		{
			path: '/how-it-works',
			textId: 'menu.how-it-works',
		},
		{
			path: '/about-us',
			textId: 'menu.about-us',
		},
		{
			path: '/contact-form',
			textId: 'menu.contact-form',
		},
	],
	secondaryLinks: [
		{
			path: '/brand',
			textId: 'menu.brand',
		},
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
				menuLinks: state.menuLinks.map((menuLink) => ({
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
