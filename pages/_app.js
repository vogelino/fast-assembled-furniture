import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LanguageSwitch from '../components/LanguageSwitch'
import '../styles/globals.css'
import Head from '../components/Head'
import Cart from '../components/Cart'
import { CartProvider } from '../components/CartContext'
import { LoadingProvider } from '../components/LoadingContext'

function MyApp ({
  Component,
  pageProps
}) {
  const router = useRouter()

  return (
    <LoadingProvider>
      <CartProvider>
        <div className='container mx-auto p-4'>
          <Head
            siteTitle={pageProps?.seo?.siteTitle}
            pageTitle={pageProps?.seo?.title}
            description={pageProps?.seo?.description}
            keywords={pageProps?.seo?.keywords}
            themeColor={pageProps?.seo?.themeTextColor}
            twitterUsername={pageProps?.seo?.twitterUsername}
            socialThumbnail={pageProps?.seo?.thumbnail?.url}
            locales={router.locales}
            locale={router.locale}
            currentPagePath={router.asPath}
          />
          <header className='flex place-content-between items-center mb-4'>
            <Link href='/' locale={router.locale}>
              <a>
                <h2 className='font-bold'>Home</h2>
              </a>
            </Link>
            <div>
              <Cart locale={router.locale} />
              <LanguageSwitch />
            </div>
          </header>
          <Component {...pageProps} />
        </div>
      </CartProvider>
    </LoadingProvider>
  )
}

export default MyApp
