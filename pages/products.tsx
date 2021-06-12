import { FC } from 'react'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { request } from '@utils/requestUtil'
import {
	MappedSeoProps,
	mapProductsToProps,
	mapSeoToProps,
	RawProduct,
	RawSeoCommons,
	RawSeoPage,
	RawThumbnail,
} from '@utils/graphcmsUtil'
import ProductList, { Product, Products } from '@components/ProductList'
import Layout from '@components/Layout'

const Home: FC<Products> = ({ products }) => (
	<Layout>
		<ProductList products={products} />
	</Layout>
)

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

interface Data {
	products: RawProduct[]
	thumbnails: RawThumbnail[]
	pages: RawSeoPage[]
	seoCommons: RawSeoCommons[]
}

const mapDataToProps = ({
	products,
	thumbnails,
	pages,
	seoCommons,
}: Data): {
	products: Product[]
	seo: MappedSeoProps
} => ({
	products: mapProductsToProps(products, thumbnails),
	seo: mapSeoToProps({ pages, seoCommons }),
})

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
	const lang = locale || defaultLocale
	const props = await request(query, { locale: lang })
	return { props: mapDataToProps(props) }
}
