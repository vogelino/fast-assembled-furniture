import Head from 'next/head'
import { gql } from 'graphql-request'
import { request } from '../utils/requestUtil'
import { mapProductToProps } from '../utils/graphcmsUtil'
import ProductList from '../components/ProductList'

export default function Home ({ products }) {
  return (
    <>
      <Head>
        <title>FAF - Products</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ProductList products={products} />
    </>
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
  }
`

const mapDataToProps = ({ products, thumbnails }) => ({
  products: products.map((product) => ({
    ...mapProductToProps(product),
    thumbnail: thumbnails.find((thumb) => thumb.slug === product.slug)?.thumbnail
  }))
})

export async function getStaticProps ({ locale, defaultLocale }) {
  const lang = locale || defaultLocale
  const props = await request(query, { locale: lang })
  return { props: mapDataToProps(props) }
}
