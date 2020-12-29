import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from './Button'
import { destroyCookie } from 'nookies'

export default function CheckoutForm ({ paymentIntent }) {
  const stripe = useStripe()
  const elements = useElements()
  const [checkoutError, setCheckoutError] = useState()
  const [checkoutSuccess, setCheckoutSuccess] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })

      if (res.error) throw new Error(res.error.message)
      if (res.paymentIntent?.status === 'succeeded') {
        destroyCookie(null, 'paymentIntentId')
        setCheckoutSuccess(true)
      }
    } catch (err) {
      setCheckoutError(err.message)
      console.log(err)
    }
  }

  if (checkoutSuccess) return <h1>Payment success!</h1>

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <Button type='submit' disabled={!stripe}>Pay now</Button>

      {checkoutError && <span className='text-red-500'>{checkoutError}</span>}
    </form>
  )
}
