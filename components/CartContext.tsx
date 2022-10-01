import { FC, createContext, useState, useEffect } from 'react'
import { Product } from '@components/ProductList'

const LOCAL_STORAGE_CART_KEY = 'FAF_CART'

type Cart = { [key: string]: Product }
type DefineCartSignature = (cart: Cart) => void
type AddCartItemSignature = (slug: string, item: Product) => void
type RemoveCartItemSignature = (slug: string) => void

type CartContextType = {
	cartSize: number
	cartTotalPrice: number
	cart: Cart
	addCartItem: AddCartItemSignature
	removeCartItem: RemoveCartItemSignature
	cartIsOpened: boolean
	closeCart: () => void
	openCart: () => void
	toggleCart: () => void
}

const defaultState = {
	cartSize: 0,
	cartTotalPrice: 0,
	cart: {},
	addCartItem: () => undefined,
	removeCartItem: () => undefined,
	cartIsOpened: false,
	closeCart: () => undefined,
	openCart: () => undefined,
	toggleCart: () => undefined,
}

export const CartContext = createContext<CartContextType>(defaultState)

export const CartProvider: FC<{
	children: JSX.Element
}> = ({ children }) => {
	const [cart, setCart] = useState(defaultState.cart as Cart)
	const [cartIsOpened, setCartIsOpened] = useState(defaultState.cartIsOpened)

	const defineCart: DefineCartSignature = (cart2define) => {
		setCart(cart2define)
		window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart))
	}

	const addCartItem: AddCartItemSignature = (slug, item) => {
		defineCart({
			...cart,
			[slug]: item,
		})
	}

	const removeCartItem: RemoveCartItemSignature = (slug) => {
		defineCart(
			Object.keys(cart).reduce((acc, key) => {
				const val = cart[key]
				if (key === slug) return acc
				return { ...acc, [key]: val }
			}, {} as Cart)
		)
	}

	useEffect(() => {
		const localStorageCart = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY)
		if (!localStorageCart) return
		try {
			setCart(JSON.parse(localStorageCart) as Cart)
		} catch {
			setCart({})
			window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify({}))
		}
	}, [])

	return (
		<CartContext.Provider
			value={{
				cartSize: Object.keys(cart).length || 0,
				cartTotalPrice: Object.values(cart).reduce((acc, product) => acc + product.startPrice, 0),
				cartIsOpened,
				openCart: () => setCartIsOpened(true),
				closeCart: () => setCartIsOpened(false),
				toggleCart: () => setCartIsOpened(!cartIsOpened),
				cart,
				addCartItem,
				removeCartItem,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
