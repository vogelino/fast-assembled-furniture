import { FC } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '@components/CartContext'
import { LoadingProvider } from '@components/LoadingContext'
import Head from '@components/Head'
import { ColorThemeProvider } from '@components/ColorThemeContext'
import { MenuProvider } from '@components/MenuContext'
import { PageFrame } from '@components/PageFrame'

interface MyPageProps {
	seo?: {
		siteTitle?: string
		title?: string
		description?: string
		keywords?: string[]
		themeTextColor?: string
		twitterUsername?: string
		thumbnail?: {
			url?: string
		}
	}
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	const router = useRouter()
	const pProps = pageProps as MyPageProps

	return (
		<ColorThemeProvider>
			<LoadingProvider>
				<CartProvider>
					<MenuProvider>
						<Head
							siteTitle={pProps?.seo?.siteTitle}
							pageTitle={pProps?.seo?.title}
							description={pProps?.seo?.description}
							keywords={pProps?.seo?.keywords || []}
							themeColor={pProps?.seo?.themeTextColor}
							twitterUsername={pProps?.seo?.twitterUsername}
							socialThumbnail={pProps?.seo?.thumbnail?.url}
							fbAppId={process.env.FACEBOOK_APP_ID}
							locales={router.locales}
							locale={router.locale}
							currentPagePath={router.asPath}
						/>
						{/* eslint-disable-next-line react/jsx-props-no-spreading */}
						<Component {...pageProps} />
						<PageFrame />
					</MenuProvider>
				</CartProvider>
			</LoadingProvider>
		</ColorThemeProvider>
	)
}
export default MyApp
