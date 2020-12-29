import React, { useContext } from 'react'
import { CartContext } from './CartContext'

export default function Cart () {
  const [cart] = useContext(CartContext)

  return (
    <span className='mr-8'>
      {cart ? `🛒 ${Object.keys(cart).length}` : '...'}
    </span>
  )
}
