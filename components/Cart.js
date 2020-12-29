import React, { useState, useContext, useRef } from 'react'
import Link from 'next/link'
import { CartContext } from './CartContext'
import useOnClickOutside from '../utils/hooks/useOnClickOutside'

const getTotalPrice = (cart) => Object.values(cart).reduce((acc, product) => acc + product.startPrice, 0)

export default function Cart () {
  const [cart, , getCartRemover] = useContext(CartContext)
  const ref = useRef(null)
  const [cartIsOpened, setCartIsOpened] = useState(false)
  useOnClickOutside(ref, () => setCartIsOpened(false))

  const hasCart = cart && Object.keys(cart).length > 0

  const getCartRemoverHandler = (slug) => (e) => {
    getCartRemover(slug)(e)

    if (Object.keys(cart).length === 0) {
      setCartIsOpened(false)
    }
  }

  return (
    <span className='group mr-8 relative cursor-pointer' ref={ref}>
      {hasCart && (
        <span onClick={() => setCartIsOpened(true)}>
          🛒 {Object.keys(cart).length} (${getTotalPrice(cart)}€)
        </span>
      )}
      {cartIsOpened && hasCart && (
        <div className='absolute top-100 right-0 bg-white z-10 w-max rounded shadow-md border-2 border-black'>
          {Object.values(cart).map((product) => (
            <Link href={`/${product.slug}`} key={product.slug}>
              <a className='block py-4 px-6 border-t hover:bg-gray-200 focus:bg-black focus:text-white focus:outline-none focus:border-black'>
                <h4 className='font-bold'>{product.title}</h4>
                <span className='mr-4'>{product.startPrice}€</span>
                <span className='text-sm underline float-right' onClick={getCartRemoverHandler(product.slug)}>Remove</span>
              </a>
            </Link>
          ))}
        </div>
      )}
    </span>
  )
}
