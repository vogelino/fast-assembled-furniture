import { gql } from 'graphql-request'
import { request } from '../utils/requestUtil'
import { mapProductToProps, ProductUnmapped } from '../utils/graphcmsUtil'
import ProductList, { Product, Products, Thumbnail } from '../components/ProductList'
import Layout from '../components/Layout'


const Home: React.FC<Products> = ({ products }) => {
  return (
    <Layout>
      <ProductList products={products} />
    </Layout>
  )
}

export default Home

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

interface SeoPage {
  seoTitle: string,
  seoKeywords: string[],
  seoDescription: string
}

interface SeoCommons {
  siteTitle: string,
  themeTextColor: string,
  twitterUsername: string
}

interface Data {
  products: Product[],
  thumbnails: Thumbnail[],
  pages: SeoPage[],
  seoCommons: SeoCommons[],
}

const mapDataToProps = ({ products, thumbnails, pages, seoCommons }) => ({
  products: products.map((product: ProductUnmapped) => ({
    ...mapProductToProps(product),
    thumbnail: thumbnails.find((thumb: Thumbnail) => thumb.slug === product.slug)?.thumbnail
  })),
  seo: {
    title: pages[0]?.seoTitle,
    description: pages[0]?.seoDescription,
    keywords: pages[0]?.seoKeywords,
    ...seoCommons[0]
  }
})

export async function getStaticProps({ locale, defaultLocale }) {
  const lang = locale || defaultLocale
  const props = await request(query, { locale: lang })
  return { props: mapDataToProps(props) }
}
