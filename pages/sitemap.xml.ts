import { NextPage, NextApiResponse } from 'next'
import { Component } from 'react'
import { gql } from 'graphql-request'
import { request } from '@utils/requestUtil'

type Product = {
	slug: string
	updatedAt: string
}

const createFullUrl: (path: string) => string = (path) =>
	`${process.env.URL || 'http://localhost:3000'}${path}`
const formatDate: (dateStr?: string) => string = (dateStr) => {
	const date = dateStr ? new Date(dateStr) : new Date()
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

const getSitemap: (props: { products: Product[] }) => string = ({
	products,
}) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${createFullUrl('/')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/products')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  ${products
		.map(
			({ slug, updatedAt }) => `
  <url>
    <loc>${createFullUrl(`/products/${slug}`)}</loc>
    <lastmod>${formatDate(updatedAt)}</lastmod>
  </url>`
		)
		.join('')}
</urlset>`

const sitemapQuery = gql`
	query SitemapQuery($stage: Stage!) {
		products(stage: $stage) {
			slug
			updatedAt
		}
	}
`

class Sitemap extends Component<NextPage> {
	static async getInitialProps({ res }: { res: NextApiResponse }): Promise<void> {
		const generationData: { products: Product[] } = await request(sitemapQuery)
		res.setHeader('Content-Type', 'text/xml')
		res.write(getSitemap(generationData))
		res.end()
	}
}

export default Sitemap
