import React from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import { CartProvider } from '../components/CartContext'
import { LoadingProvider } from '../components/LoadingContext'
import Head from '../components/Head'

const MyApp = ({
  Component,
  pageProps
}) => {
  const router = useRouter()

  return (
    <LoadingProvider>
      <CartProvider>
        <Head
          siteTitle={pageProps?.seo?.siteTitle}
          pageTitle={pageProps?.seo?.title}
          description={pageProps?.seo?.description}
          keywords={pageProps?.seo?.keywords}
          themeColor={pageProps?.seo?.themeTextColor}
          twitterUsername={pageProps?.seo?.twitterUsername}
          socialThumbnail={pageProps?.seo?.thumbnail?.url}
          fbAppId={process.env.FACEBOOK_APP_ID}
          locales={router.locales}
          locale={router.locale}
          currentPagePath={router.asPath}
        />
        <Component {...pageProps} />
      </CartProvider>
    </LoadingProvider>
  )
}
export default MyApp
