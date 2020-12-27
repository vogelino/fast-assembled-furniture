import React from 'react'
import { gql } from 'graphql-request'
import { request } from '../utils/requestUtil'

const getSitemap = ({ products }) => `<?xml version="1.0" encoding="utf-8"?>
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

const createFullUrl = (path) =>
  `${process.env.URL || 'http://localhost:3000'}${path}`
const formatDate = (dateStr) => {
  const date = dateStr ? new Date(dateStr) : new Date()
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`
}

const sitemapQuery = gql`
  query SitemapQuery($stage: Stage!) {
    products(stage: $stage) {
      slug
      updatedAt
    }
  }
`

class Sitemap extends React.Component {
  static async getInitialProps ({ res }) {
    const generationData = await request(sitemapQuery)
    res.setHeader('Content-Type', 'text/xml')
    res.write(getSitemap(generationData))
    res.end()
  }
}

export default Sitemap
