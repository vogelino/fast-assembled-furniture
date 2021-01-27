import { FC, createContext, useState, useEffect, MouseEvent } from 'react'
import { Product } from '@/components/ProductList'

const LOCAL_STORAGE_CART_KEY = 'FAF_CART'

type Event = Pick<MouseEvent, 'preventDefault'>
type Cart = { [key: string]: Product }
type DefineCartSignature = (cart: Cart) => void
type GetCartAdderSignature = (slug: string, item: Product) => (e: Event) => void
type GetCartRemoverSignature = (slug: string) => (e: Event) => void

type CartContextType = [
	cart: Cart,
	getCartAdder: GetCartAdderSignature,
	getCartRemover: GetCartRemoverSignature
]

export const CartContext = createContext<CartContextType>([
	{},
	() => () => undefined,
	() => () => undefined,
])

export const CartProvider: FC = ({ children }) => {
	const [cart, setCart] = useState({} as Cart)

	const defineCart: DefineCartSignature = (cart2define) => {
		setCart(cart2define)
		window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart))
	}

	const getCartAdder: GetCartAdderSignature = (slug, item) => (e) => {
		e.preventDefault()
		defineCart({
			...cart,
			[slug]: item,
		})
	}

	const getCartRemover: GetCartRemoverSignature = (slug) => (e) => {
		e.preventDefault()

		defineCart(
			Object.keys(cart).reduce((acc, key) => {
				const val = cart[key as string]
				if (key === slug) return acc
				return { ...acc, [key]: val }
			}, {} as Cart)
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
		<CartContext.Provider value={[cart, getCartAdder, getCartRemover]}>
			{children}
		</CartContext.Provider>
	)
}
