import React, { useState, useContext, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import useOnClickOutside from '../utils/hooks/useOnClickOutside'
import { CartContext } from './CartContext'

const getTotalPrice = (cart) => Object.values(cart).reduce((acc, product) => acc + product.startPrice, 0)

export default function Cart () {
  const [cart, , getCartRemover] = useContext(CartContext)
  const { locale } = useRouter()
  const ref = useRef(null)
  const [cartIsOpened, setCartIsOpened] = useState(false)
  useOnClickOutside(ref, () => setCartIsOpened(false))
  const { t } = useTranslation('common')
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })

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
        <span onClick={() => setCartIsOpened(!cartIsOpened)}>
          {cartIsOpened ? `${t('cart.close')} ✕` : `🛒 ${Object.keys(cart).length}`}
        </span>
      )}
      {cartIsOpened && hasCart && (
        <div className='fixed sm:absolute top-14 sm:top-8 right-0 bg-white z-10 w-screen sm:w-max sm:rounded shadow-md sm:border-2 border-black'>
          {Object.values(cart).map((product) => (
            <Link href={`/${product.slug}`} key={product.slug}>
              <a className='block py-4 px-6 border-t hover:bg-gray-200 focus:bg-black focus:text-white focus:outline-none focus:border-black'>
                <h4 className='font-bold'>{product.title}</h4>
                <span className='mr-4'>{currency.format(product.startPrice)}</span>
                <span className='text-sm underline float-right' onClick={getCartRemoverHandler(product.slug)}>{t('cart.remove')}</span>
              </a>
            </Link>
          ))}
          <Link href='/checkout' locale={locale}>
            <button
              onClick={() => setCartIsOpened(false)}
              className='block px-6 py-4 border-t w-full text-left bg-black text-white focus:outline-none font-bold hover:bg-gray-800 hover:underline transition-all'
              style={{ userSelect: 'none' }}
            >
              {t('cart.checkout')}
              <span className='float-right ml-8'>{currency.format(getTotalPrice(cart))}</span>
            </button>
          </Link>
        </div>
      )}
    </span>
  )
}
