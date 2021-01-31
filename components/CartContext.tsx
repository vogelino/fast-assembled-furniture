import { FC, createContext, useState, useEffect } from 'react'
import { Product } from '@components/ProductList'

const LOCAL_STORAGE_CART_KEY = 'FAF_CART'

type Cart = { [key: string]: Product }
type DefineCartSignature = (cart: Cart) => void
type AddCartItemSignature = (item: Product) => void
type RemoveCartItemSignature = (slug: string) => void
type ClearCartSignature = () => void

type CartContextType = {
	cartSize: number
	cart: Cart
	addCartItem: AddCartItemSignature
	removeCartItem: RemoveCartItemSignature
	clearCart: ClearCartSignature
}

const defaults = {
	cartSize: 0,
	cart: {},
	addCartItem: () => undefined,
	removeCartItem: () => undefined,
	clearCart: () => undefined,
}

export const CartContext = createContext<CartContextType>(defaults)

export const CartProvider: FC = ({ children }) => {
	const [cart, setCart] = useState<Cart>(defaults.cart)

	const defineCart: DefineCartSignature = (cart2define) => {
		setCart(cart2define)
		window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart))
	}

	const addCartItem: AddCartItemSignature = (item) => {
		defineCart({
			...cart,
			[item.slug]: item,
		})
	}

	const clearCart: ClearCartSignature = () => {
		defineCart({})
	}

	const removeCartItem: RemoveCartItemSignature = (slug) => {
		defineCart(
			Object.keys(cart).reduce((acc, key) => {
				const val = cart[key]
				if (key === slug) return acc
				return { ...acc, [key]: val }
			}, {})
		)
	}

	useEffect(() => {
		const localStorageCart = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY)
		if (!localStorageCart) return
		try {
			setCart(JSON.parse(localStorageCart))
		} catch {
			setCart({})
			window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify({}))
		}
	}, [])

	return (
		<CartContext.Provider
			value={{
				cartSize: Object.keys(cart).length,
				cart,
				clearCart,
				addCartItem,
				removeCartItem,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
