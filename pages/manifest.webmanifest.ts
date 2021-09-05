import { NextApiResponse } from 'next'
import { Component } from 'react'

const getManifest = ({
	siteTitle = 'Fast Assembled Furniture',
	themeTextColor = '#000000',
	themeBackgroundColor = '#ffffff',
}): string => `{
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

class Sitemap extends Component {
	static getInitialProps({ res }: { res: NextApiResponse }): void {
		res.setHeader('Content-Type', 'application/manifest+json')
		res.write(getManifest({}))
		res.end()
	}
}

export default Sitemap
