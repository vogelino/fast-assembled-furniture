import { NextPageContext } from 'next'
import { FC } from 'react'
import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../utils/stripeUtil'
import CheckoutForm from '../components/CheckoutForm'
import Layout from '../components/Layout'

const globalStripe = getStripe()

type PaymentIntent = { id: string }

const Checkout: FC<{ paymentIntent: PaymentIntent }> = ({ paymentIntent }) => (
	<Layout>
		<Elements stripe={globalStripe}>
			<CheckoutForm paymentIntent={paymentIntent} />
		</Elements>
	</Layout>
)

type GetServerSidePropsSignature = (
	ctx: NextPageContext
) => Promise<{
	props: { paymentIntent: PaymentIntent }
}>

export const getServerSideProps: GetServerSidePropsSignature = async (ctx) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
		apiVersion: '2020-08-27',
	})

	let paymentIntent: PaymentIntent | undefined

	const { paymentIntentId } = parseCookies(ctx)

	if (paymentIntentId) {
		paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
	} else {
		paymentIntent = await stripe.paymentIntents.create({
			amount: 1000,
			currency: 'eur',
		})
		setCookie(ctx, 'paymentIntentId', paymentIntent.id, {})
	}

	return {
		props: {
			paymentIntent,
		},
	}
}

export default Checkout
