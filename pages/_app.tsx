import { FC } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '@components/CartContext'
import { LoadingProvider } from '@components/LoadingContext'
import Head from '@components/Head'
import { ColorThemeProvider } from '@components/ColorThemeContext'
import { BorderEdge } from '@components/BorderEdge'
import { MenuProvider } from '@components/MenuContext'

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
						<div className="fixed pointer-events-none inset-0 page-edges z-50">
							<div className="relative w-full h-full">
								<BorderEdge
									orientation={'TopLeft' as const}
									className="absolute pointer-events-none top-0 left-0"
								/>
								<BorderEdge
									orientation={'TopRight' as const}
									className="absolute pointer-events-none top-0 right-0"
								/>
								<BorderEdge
									orientation={'BottomRight' as const}
									className="absolute pointer-events-none bottom-0 right-0"
								/>
								<BorderEdge
									orientation={'BottomLeft' as const}
									className="absolute pointer-events-none bottom-0 left-0"
								/>
							</div>
						</div>
					</MenuProvider>
				</CartProvider>
			</LoadingProvider>
		</ColorThemeProvider>
	)
}
export default MyApp
