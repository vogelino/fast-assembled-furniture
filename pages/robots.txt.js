import React from 'react'

const getRobots = () => `User-agent: *
Disallow: ${process.env.VERCEL_ENV === 'production' ? '/_next/static/' : '/'}
`

class Sitemap extends React.Component {
  static async getInitialProps ({ res }) {
    res.setHeader('Content-Type', 'text/plain')
    res.write(getRobots())
    res.end()
  }
}

export default Sitemap
