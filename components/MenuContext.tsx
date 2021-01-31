import { useRouter } from 'next/router'
import { FC, createContext, useState } from 'react'

type MenuLink = {
	path: string
	title: string
	active?: boolean
}

interface MenuContextType {
	menuLinks: MenuLink[]
	secondaryLinks: MenuLink[]
	menuIsOpened: boolean
	cartIsOpened: boolean
	openMenu: () => void
	openCart: () => void
	closeMenu: () => void
	toggleMenu: () => void
	toggleCart: () => void
}

const defaults = {
	menuLinks: [
		{
			path: '/',
			title: 'Home',
		},
		{
			path: '/faf-product-faf-shelve-a32s',
			title: 'The sideboard',
		},
		{
			path: '/how-it-works',
			title: 'How it works',
		},
		{
			path: '/about-us',
			title: 'About us',
		},
		{
			path: '/contact-form',
			title: 'Contact form',
		},
	],
	secondaryLinks: [
		{
			path: '/brand',
			title: 'Brand assets',
		},
		{
			path: '/imprint',
			title: 'Imprint',
		},
		{
			path: '/data-privacy-guideline',
			title: 'Data privacy guideline',
		},
	],
	menuIsOpened: false,
	cartIsOpened: false,
	openMenu: () => undefined,
	openCart: () => undefined,
	closeMenu: () => undefined,
	toggleMenu: () => undefined,
	toggleCart: () => undefined,
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
				openMenu: () => setState({ ...state, menuIsOpened: true, cartIsOpened: false }),
				openCart: () => setState({ ...state, cartIsOpened: true, menuIsOpened: false }),
				closeMenu: () => setState({ ...state, menuIsOpened: false, cartIsOpened: false }),
				toggleMenu: () =>
					setState({ ...state, menuIsOpened: !state.menuIsOpened, cartIsOpened: false }),
				toggleCart: () =>
					setState({ ...state, cartIsOpened: !state.cartIsOpened, menuIsOpened: false }),
			}}
		>
			{children}
		</MenuContext.Provider>
	)
}
