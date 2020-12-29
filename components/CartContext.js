import React, { useState, useEffect } from 'react'

const LOCAL_STORAGE_CART_KEY = 'FAF_CART'

export const CartContext = React.createContext()

export const CartProvider = (props) => {
  const [cart, setCart] = useState({})

  const defineCart = (cart) => {
    setCart(cart)
    window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart))
  }

  const getCartAdder = (slug, item) => (e) => {
    e.preventDefault()
    defineCart({
      ...cart,
      [slug]: item
    })
  }

  const getCartRemover = (slug) => (e) => {
    e.preventDefault()

    defineCart(Object.keys(cart).reduce((acc, key) => {
      const val = cart[key]
      if (key === slug) return acc
      return { ...acc, [key]: val }
    }, {}))
  }

  useEffect(() => {
    const localStorageCart = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY)
    if (!localStorageCart) return
    try {
      setCart(JSON.parse(localStorageCart))
    } catch {
      setCart({})
      window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify({}))
    }
  }, [])

  return (
    <CartContext.Provider value={[cart, getCartAdder, getCartRemover]}>
      {props.children}
    </CartContext.Provider>
  )
}
