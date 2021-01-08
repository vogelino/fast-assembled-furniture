import { NextApiResponse } from 'next'
import { Component } from 'react'

const getRobots = () => `User-agent: *
Disallow: ${process.env.VERCEL_ENV === 'production' ? '/_next/static/' : '/'}
`

class Sitemap extends Component {
	static async getInitialProps({ res }: { res: NextApiResponse }): Promise<void> {
		res.setHeader('Content-Type', 'text/plain')
		res.write(getRobots())
		res.end()
	}
}

export default Sitemap
