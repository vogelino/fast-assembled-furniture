import { useState, FC, MouseEvent } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { destroyCookie } from 'nookies'
import Button from './Button'

// eslint-disable-next-line camelcase
type PaymentIntent = { id: string; client_secret: string | null }
const CheckoutForm: FC<{ paymentIntent: PaymentIntent }> = ({ paymentIntent }) => {
	const stripe = useStripe()
	const elements = useElements()
	const [checkoutError, setCheckoutError] = useState(false)
	const [checkoutSuccess, setCheckoutSuccess] = useState(false)

	const handleSubmit = async (e: Pick<MouseEvent, 'preventDefault'>) => {
		e.preventDefault()

		if (!stripe || !elements) return

		try {
			const res = await stripe.confirmCardPayment(paymentIntent.client_secret || '', {
				payment_method: {
					card: elements.getElement(CardElement) as StripeCardElement,
				},
			})

			if (res.error) throw new Error(res.error.message)
			if (res.paymentIntent?.status === 'succeeded') {
				destroyCookie(null, 'paymentIntentId')
				setCheckoutSuccess(true)
			}
		} catch (err) {
			setCheckoutError(err.message)
		}
	}

	if (checkoutSuccess) return <h1>Payment success!</h1>

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />

			<Button type="submit" disabled={!stripe}>
				Pay now
			</Button>

			{checkoutError && <span className="text-red-500">{checkoutError}</span>}
		</form>
	)
}

export default CheckoutForm
