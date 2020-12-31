import { gql } from 'graphql-request'
import { request } from '../utils/requestUtil'
import { mapProductToProps } from '../utils/graphcmsUtil'
import ProductList from '../components/ProductList'
import Layout from '../components/Layout'

export default function Home ({ products }) {
  return (
    <Layout>
      <ProductList products={products} />
    </Layout>
  )
}

const query = gql`
  query AllProductsHome($stage: Stage!, $locale: Locale!) {
    products(stage: $stage, locales: [$locale]) {
      slug
      title
      description {
        markdown
      }
      startPrice
      isConfigurable
    }
    thumbnails: products(stage: $stage) {
      slug
      thumbnail {
        url
      }
    }
    pages(where: { isHomepage: true }, stage: $stage, locales: [$locale]) {
      seoTitle
      seoKeywords
      seoDescription
    }
    seoCommons(stage: $stage, locales: [$locale]) {
      siteTitle
      themeTextColor
      twitterUsername
    }
  }
`

const mapDataToProps = ({ products, thumbnails, pages, seoCommons }) => ({
  products: products.map((product) => ({
    ...mapProductToProps(product),
    thumbnail: thumbnails.find((thumb) => thumb.slug === product.slug)?.thumbnail
  })),
  seo: {
    title: pages[0]?.seoTitle,
    description: pages[0]?.seoDescription,
    keywords: pages[0]?.seoKeywords,
    ...seoCommons[0]
  }
})

export async function getStaticProps ({ locale, defaultLocale }) {
  const lang = locale || defaultLocale
  const props = await request(query, { locale: lang })
  return { props: mapDataToProps(props) }
}
