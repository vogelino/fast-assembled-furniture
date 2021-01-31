import { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import { ShoppingCart } from 'react-feather'
import { CartContext } from '@components/CartContext'
import { Button } from '@components/SquareButton'
import { ButtonWithBorderEdges } from '@components/BorderEdge'
import { MenuContext } from '@components/MenuContext'
import Link from '@components/Link'
import Image from 'next/image'

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
				<h3 className="gf uppercase font-bold text-2xl p-4 leading-7">Your cart</h3>
				<Button
					type="button"
					icon="XSquare"
					onClick={() => {
						clearCart()
						closeMenu()
					}}
				>
					Clear
				</Button>
			</div>
			{cartArray.map((product) => (
				<div className="" key={product.slug}>
					<div
						className="relative rounded-lg border-bd border-primary overflow-hidden -mt-bd -ml-bd w-full-p"
						style={{
							width: 'calc(256px + var(--borderWidth, 3px))',
							height: 120,
						}}
					>
						{product.thumbnail && (
							<Image
								src={product.thumbnail.url}
								width={256}
								height={120}
								objectFit="cover"
								layout="fixed"
							/>
						)}
						<div className="absolute -bottom-bd -right-bd" style={{ width: 64, height: 61 }}>
							<ButtonWithBorderEdges
								icon="Trash2"
								openings={['TopLeft']}
								edges={[
									{ position: 'LeftBottom', orientation: 'BottomRight' },
									{ position: 'TopRight', orientation: 'BottomRight' },
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
					<div className="gf p-4">
						<h4 className="uppercase font-bold leading-tight">{product.title}</h4>
						<p>{currency.format(product.startPrice)}</p>
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
