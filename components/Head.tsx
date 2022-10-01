import { FC, useContext, useEffect } from 'react'
import NextHead from 'next/head'
import getHeadFavicons from '@utils/faviconsUtil'
import { LoadingContext } from '@components/LoadingContext'

const siteUrl = process.env.URL || 'http://localhost:3000'

interface LoadingContextType {
	isLoading: boolean
	stopLoading: () => void
}

const Head: FC<{
	currentPagePath?: string
	description?: string
	siteTitle?: string
	pageTitle?: string
	fbAppId?: string
	keywords: string[]
	themeColor?: string
	locales?: string[]
	locale?: string
	twitterUsername?: string
	socialThumbnail?: string
}> = ({
	currentPagePath = '/',
	description = '',
	siteTitle = 'Fast Assembled Furniture',
	pageTitle = 'Fast Assembled Furniture',
	fbAppId = '',
	keywords = [],
	themeColor = '#000000',
	locales = ['de', 'en'],
	locale = 'de',
	twitterUsername = '',
	socialThumbnail = '',
}) => {
	const { isLoading, stopLoading }: LoadingContextType = useContext(LoadingContext)

	useEffect(() => {
		const to = setTimeout(stopLoading, 10000)
		return () => {
			clearTimeout(to)
		}
	}, [stopLoading])

	const longTitle = [pageTitle, siteTitle].join(' ✦ ')

	return (
		<NextHead>
			<title>{longTitle}</title>

			{description && <meta name="description" content={description} />}

			<meta property="og:type" content="article" />

			<meta name="theme-color" content={themeColor} />

			{keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<meta itemProp="name" content={longTitle} />
			<meta itemProp="description" content={description} />

			<meta name="twitter:card" content="summary_large_image" />
			{twitterUsername && <meta name="twitter:site" content={`@${twitterUsername}`} />}
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={description} />

			<meta property="og:title" content={pageTitle} />
			<meta property="og:type" content="website" />
			<meta property="og:locale" content={locale} />
			<meta property="og:locale:alternate" content={`[${locales.join(',')}]`} />
			<meta property="og:url" content={`${siteUrl}${currentPagePath}`} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={siteTitle} />
			{fbAppId && <meta property="fb:app_id" content={fbAppId} />}

			{socialThumbnail && <meta itemProp="image" content={socialThumbnail} />}
			{socialThumbnail && <meta name="twitter:image" content={socialThumbnail} />}
			{socialThumbnail && <meta property="og:image" content={socialThumbnail} />}
			{socialThumbnail && <meta property="og:image:alt" content={socialThumbnail} />}

			<link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />

			{getHeadFavicons({ isPlaying: isLoading }).map((favicon) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<link key={favicon.href} {...favicon} />
			))}

			<link rel="manifest" href="/manifest.webmanifest" />

			<link rel="author" href="https://vogelino.com" />
		</NextHead>
	)
}

export default Head
