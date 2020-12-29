import React from 'react'
import NextHead from 'next/head'

const siteUrl = process.env.URL

export default function Head ({
  currentPagePath = '/',
  description = '',
  siteTitle = 'Fast Assembled Furniture',
  pageTitle = 'Fast Assembled Furniture',
  keywords = [],
  themeColor = '#000000',
  locales = ['de', 'en'],
  locale = 'de',
  twitterUsername,
  socialThumbnail
}) {
  const longTitle = [pageTitle, siteTitle].join(' ✦ ')
  return (
    <NextHead>
      <title>{longTitle}</title>

      {description && <meta name='description' content={description} />}

      <meta property='og:type' content='article' />

      <meta name='theme-color' content={themeColor} />

      {keywords.length > 0 && <meta name='keywords' content={keywords.join(', ')} />}

      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <meta itemProp='name' content={longTitle} />
      <meta itemProp='description' content={description} />

      {socialThumbnail && <meta itemProp='image' content={socialThumbnail} />}
      {socialThumbnail && <meta name='twitter:image' content={socialThumbnail} />}
      {socialThumbnail && <meta property='og:image' content={socialThumbnail} />}

      <meta name='twitter:card' content='summary' />
      {twitterUsername && <meta name='twitter:site' content={`@${twitterUsername}`} />}
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />

      <meta property='og:title' content={pageTitle} />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content={locale} />
      <meta property='og:locale:alternate' content={`[${locales.join(',')}]`} />
      <meta property='og:url' content={`${siteUrl}${currentPagePath}`} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={siteTitle} />

      <link rel='apple-touch-icon' href='/favicons/apple-touch-icon.png' />

      <link rel='icon' type='image/png' href='/favicons/favicon-16x16.png' sizes='16x16' />
      <link rel='icon' type='image/png' href='/favicons/favicon-32x32.png' sizes='32x32' />
      <link rel='shortcut icon' href='/favicon.ico' />

      <link rel='manifest' href='/manifest.webmanifest' />

      <link rel='author' href='https://vogelino.com' />
    </NextHead>
  )
}