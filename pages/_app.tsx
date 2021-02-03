import { FC } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'

import Head from '@components/Head'
import { Providers } from '@components/Providers'

import '@fontsource/inter/variable.css'
import '../styles/globals.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	const router = useRouter()

	return (
		<Providers>
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
		</Providers>
	)
}
export default MyApp
