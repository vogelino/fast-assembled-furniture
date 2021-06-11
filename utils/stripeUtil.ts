import { loadStripe, Stripe } from '@stripe/stripe-js'

type StripePromiseType = Promise<Stripe | null>

let stripePromise: StripePromiseType
const getStripe: () => StripePromiseType = () => {
	if (stripePromise === null) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
	}
	return stripePromise
}

export default getStripe
