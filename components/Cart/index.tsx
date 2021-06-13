import { FC, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { CartContext } from '@components/CartContext'
import { Button } from '@components/SquareButton'
import styles from './Cart.module.css'

export const Cart: FC = () => {
	const { cartSize, cart, closeCart, removeCartItem, cartTotalPrice } = useContext(CartContext)
	const { locale, push } = useRouter()
	const { t } = useTranslation('common')
	const cartArray = Object.values(cart)

	const currency = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR',
	})

	const onRemoveItem = (slug: string): void => {
		removeCartItem(slug)

		if (cartArray.length <= 1) {
			closeCart()
		}
	}

	return (
		<div className={[styles.container, 'gfc h-full z-20 overflow-hidden relative'].join(' ')}>
			<div
				className={[
					styles.innerContainer,
					cartSize !== 0 ? styles.innerContainerWithCart : styles.innerContainerWithoutCart,
					'grid grid-flow-row w-full-p h-full',
				].join(' ')}
			>
				<div
					className={[
						'overflow-y-auto overflow-x-hidden border-bd rounded-lg',
						'-mt-bd sm:ml-0 w-full-p sm:w-full sm:border-b-0 border-b-0',
						'flex flex-col sm:flex-row sm:justify-items-stretch flex-wrap',
					].join(' ')}
				>
					{cartArray.length === 0 && (
						<div className="gf p-8 w-full-p flex-grow grid place-items-center">
							{t('cart.empty')}
						</div>
					)}
					{cartArray.map(({ slug, title, startPrice }) => (
						<li
							key={slug}
							className={[
								'w-full-p sm:w-auto h-auto',
								'gf flex-grow-0 sm:flex-grow list-none uppercase',
								'text-2xl flex items-center',
							].join(' ')}
						>
							<Link href={`/${slug}`} key={slug}>
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<a
									className={[
										'grid sm:flex gap-4 justify-between items-center p-4 sm:px-6',
										'hover:bg-gray-200 focus:bg-primary50 focus:outline-none',
									].join(' ')}
									role="button"
									tabIndex={0}
									onClick={closeCart}
									onKeyPress={(e) => {
										if (e.key !== 'Enter') return
										closeCart()
										void push(`/${slug}`)
									}}
								>
									<h4 className="font-bold leading-7">
										{title}
										<span className="sm:ml-4 font-light block sm:inline">
											{currency.format(startPrice)}
										</span>
									</h4>
									<span
										className="text-sm p-2 -ml-2 sm:ml-0 -mt-2 sm:mt-0 rounded underline float-right focus:outline-none focus:bg-primary20"
										onClick={(e) => {
											e.preventDefault()
											e.stopPropagation()
											onRemoveItem(slug)
										}}
										role="button"
										tabIndex={0}
										onKeyPress={(e) => {
											e.preventDefault()
											if (e.key !== 'Enter') return
											onRemoveItem(slug)
										}}
									>
										{t('cart.remove')}
									</span>
								</a>
							</Link>
						</li>
					))}
					{cartSize >= 1 && (
						<>
							<li className="hidden sm:grid flex-grow">
								<Button type="button" colorType="Buy" className="w-full-p">
									{t('cart.checkout')}{' '}
									<span className="inline-block text-sm font-normal">
										({currency.format(cartTotalPrice)})
									</span>
								</Button>
							</li>
							<li className="sm:hidden gfc list-none flex-grow w-full-p relative">
								<div className="gf absolute top-0 left-0 right-bd -bottom-bd"></div>
							</li>
						</>
					)}
				</div>
				{cartSize >= 1 && (
					<div className="sm:hidden gfc -mt-bd w-full">
						<Button type="button" colorType="Buy" className="w-full-p">
							{t('cart.checkout')}{' '}
							<span className="inline-block text-sm font-normal">
								({currency.format(cartTotalPrice)})
							</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
