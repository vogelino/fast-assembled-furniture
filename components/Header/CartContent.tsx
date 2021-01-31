import { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import { ShoppingCart } from 'react-feather'
import { CartContext } from '@components/CartContext'
import { Button } from '@components/SquareButton'
import { ButtonWithBorderEdges } from '@components/BorderEdge'
import { MenuContext } from '@components/MenuContext'
import Link from '@components/Link'

export const CartContent: FC = () => {
	const { locale } = useRouter()
	const { closeMenu } = useContext(MenuContext)
	const { cart, cartSize, removeCartItem, clearCart } = useContext(CartContext)
	const cartArray = Object.values(cart)

	const currency = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
	})

	return (
		<div
			className="inline-grid grid-flow-row w-full-p"
			style={{
				gridTemplateRows: cartSize ? `61px repeat(${cartSize}, auto) 1fr` : '61px 1fr',
				minHeight: 'calc(100% + var(--borderWidth, 3px))',
			}}
		>
			<div className="grid" style={{ gridTemplateColumns: '1fr 64px' }}>
				<h3 className="gf uppercase font-bold text-2xl p-4">Your cart</h3>
				<Button type="button" icon="XSquare" onClick={clearCart}>
					Clear
				</Button>
			</div>
			{cartArray.map((product) => (
				<div className="relative gf p-4 pr-20" key={product.slug}>
					<h4 className="uppercase font-bold leading-tight">{product.title}</h4>
					<p>{currency.format(product.startPrice)}</p>
					<div className="absolute top-0 -right-bd" style={{ width: '64px' }}>
						<ButtonWithBorderEdges
							icon="Trash2"
							openings={['BottomLeft']}
							edges={[
								{ position: 'LeftTop', orientation: 'TopRight' },
								{ position: 'BottomRight', orientation: 'TopRight' },
							]}
							tabIndex={0}
							onClick={(e) => {
								e.preventDefault()
								removeCartItem(product.slug)

								if (cartArray.length - 1 <= 0) {
									closeMenu()
								}
							}}
							onKeyPress={(e) => {
								if (e.key !== 'Enter') return
								e.preventDefault()
								removeCartItem(product.slug)

								if (cartSize - 1 <= 0) {
									closeMenu()
								}
							}}
						>
							Delet.
						</ButtonWithBorderEdges>
					</div>
				</div>
			))}
			<div className="gf grid place-content-center place-items-center gap-4">
				{cartSize === 0 && (
					<>
						<span className="animate-bounce">
							<ShoppingCart className="transform rotate-180 " />
						</span>
						<span className="text-center">
							<h2>Your cart is empty</h2>
							<Link
								href="/"
								className="underline hover:no-underline hover:opacity-50 transition-opacity"
								onClick={closeMenu}
							>
								Start shopping
							</Link>
						</span>
					</>
				)}
			</div>
		</div>
	)
}
