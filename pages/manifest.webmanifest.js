import React from 'react'
import { gql } from 'graphql-request'
import { request } from '../utils/requestUtil'

const getManifest = ({
  siteTitle = 'Fast Assembled Furniture',
  themeTextColor = '#000000',
  themeBackgroundColor = '#ffffff'
}) => `{
    "name": "${siteTitle}",
    "short_name": "FAF",
    "icons": [
        {
            "src": "/favicons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/favicons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "${themeTextColor}",
    "background_color": "${themeBackgroundColor}",
    "display": "standalone"
}
`

const query = gql`
  query AllProductsHome($stage: Stage!) {
    seoCommons(stage: $stage) {
      siteTitle
      themeTextColor
      themeBackgroundColor
    }
  }
`

class Sitemap extends React.Component {
  static async getInitialProps ({ res }) {
    res.setHeader('Content-Type', 'application/manifest+json')
    const { seoCommons } = await request(query)
    res.write(getManifest(seoCommons))
    res.end()
  }
}

export default Sitemap
