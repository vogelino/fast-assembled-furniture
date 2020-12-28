import React from 'react'

const getManifest = ({
  shortTitle = 'Fast Assembled Furniture',
  longTitle = 'Fast Assembled Furniture',
  textColor = '#000000',
  backgroundColor = '#ffffff'
}) => `{
    "name": "${longTitle}",
    "short_name": "${shortTitle}",
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
    "theme_color": "${textColor}",
    "background_color": "${backgroundColor}",
    "display": "standalone"
}
`

class Sitemap extends React.Component {
  static async getInitialProps ({ res }) {
    res.setHeader('Content-Type', 'application/manifest+json')
    res.write(getManifest({}))
    res.end()
  }
}

export default Sitemap
