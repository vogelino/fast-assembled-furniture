import { FC } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '@components/CartContext'
import { LoadingProvider } from '@components/LoadingContext'
import Head from '@components/Head'
import { ColorThemeProvider } from '@components/ColorThemeContext'
import { MenuProvider } from '@components/MenuContext'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	const router = useRouter()

	return (
		<ColorThemeProvider>
			<LoadingProvider>
				<CartProvider>
					<MenuProvider>
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
						{/* eslint-disable-next-line react/jsx-props-no-spreading */}
						<Component {...pageProps} />
					</MenuProvider>
				</CartProvider>
			</LoadingProvider>
		</ColorThemeProvider>
	)
}
export default MyApp
