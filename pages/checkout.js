import React from 'react'
import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../utils/stripeUtil'
import CheckoutForm from '../components/CheckoutForm'
import Layout from '../components/Layout'

const stripe = getStripe()

const Checkout = ({ paymentIntent }) => (
  <Layout>
    <Elements stripe={stripe}>
      <CheckoutForm paymentIntent={paymentIntent} />
    </Elements>
  </Layout>
)

export const getServerSideProps = async (ctx) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  let paymentIntent

  const { paymentIntentId } = await parseCookies(ctx)

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'eur'
    })
    setCookie(ctx, 'paymentIntentId', paymentIntent.id)
  }

  return {
    props: {
      paymentIntent
    }
  }
}

export default Checkout
