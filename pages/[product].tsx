import { gql } from 'graphql-request'
import { useContext } from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MappedSeoProps, mapProductToProps, RawProduct, RawSeoCommons } from '../utils/graphcmsUtil'
import { request } from '../utils/requestUtil'
import Button from '../components/Button'
import { CartContext } from '../components/CartContext'
import Layout from '../components/Layout'
import { Product, Thumbnail } from '../components/ProductList'

type ProductPageProps = {
	slug: string
	title: string
	startPrice: number
	description?: string
	thumbnail?: Thumbnail
}

const ProductPage: NextPage<ProductPageProps> = ({
	slug,
	title,
	startPrice,
	description,
	thumbnail,
}) => {
	const [cart, getCartAdder, getCartRemover] = useContext(CartContext)
	const { t, lang } = useTranslation('product')

	const addToCart = getCartAdder(slug, { slug, title, startPrice })
	const removeFromCart = getCartRemover(slug)
	const currency = new Intl.NumberFormat(lang, {
		style: 'currency',
		currency: 'EUR',
	})

	return (
		<Layout>
			<main>
				{thumbnail && (
					<div className="rounded-xl overflow-hidden border-2 border-black">
						<Image
							src={thumbnail.url}
							alt={title}
							layout="responsive"
							width="1200"
							height="400"
							objectFit="cover"
						/>
					</div>
				)}
				<div className="px-6 py-8">
					<h3 className="text-3xl md:text-6xl font-bold px-6 py-2 mb-4 bg-black text-white inline-block rounded-full">
						{title}
					</h3>
					{startPrice && (
						<h4 className="text-xl md:text-2xl pl-6">
							{t('priceStartingFrom', { price: currency.format(startPrice) })}
						</h4>
					)}
					<p className="mt-4 pl-2">
						{cart && cart[slug] ? (
							<Button type="button" onClick={removeFromCart}>
								{t('buttons.removeFromCart')}
							</Button>
						) : (
							<Button type="button" onClick={addToCart}>
								{t('buttons.addToCart')}
							</Button>
						)}
					</p>
					<p className="text-2xl md:text-3xl mt-4 pl-6">{description}</p>
				</div>
			</main>
		</Layout>
	)
}

export default ProductPage

const individualProductQuery = gql`
	query IndividualProduct($slug: String!, $stage: Stage!, $locale: Locale!) {
		product(where: { slug: $slug }, stage: $stage, locales: [$locale]) {
			slug
			seoTitle
			seoDescription
			seoKeywords
			title
			description {
				markdown
			}
			startPrice
			isConfigurable
		}
		thumbnails: product(where: { slug: $slug }, stage: $stage) {
			thumbnail {
				url(transformation: { image: { resize: { width: 1200, height: 600, fit: crop } } })
			}
		}
		seoCommons(stage: $stage, locales: [$locale]) {
			siteTitle
			themeTextColor
			twitterUsername
		}
	}
`
interface MappedProps extends ProductPageProps {
	seo: MappedSeoProps
}

type MapRequestToPropsSignature = (args: {
	product: RawProduct
	thumbnails: { thumbnail: Thumbnail }
	seoCommons: RawSeoCommons[]
}) => MappedProps

const mapRequestToProps: MapRequestToPropsSignature = ({
	product,
	thumbnails: { thumbnail },
	seoCommons,
}) => ({
	...mapProductToProps(product),
	thumbnail,
	seo: {
		title: product.seoTitle || product.title || '',
		description: product.seoDescription || product.description?.markdown || ' ',
		keywords: product.seoKeywords || [],
		thumbnail,
		...seoCommons[0],
	},
})

export const getStaticProps: GetStaticProps = async ({ params, locale, defaultLocale }) => {
	const lang = locale || defaultLocale
	const res = await request(individualProductQuery, {
		slug: params?.product,
		locale: lang,
	})
	return { props: mapRequestToProps(res) }
}

const allProductsQuery = gql`
	query AllProductsPagePaths($stage: Stage!) {
		products(stage: $stage) {
			slug
		}
	}
`

type Locale = 'en' | 'de'

const generatePathForLocale = (locale: Locale, products: Product[]) =>
	products.map(({ slug }) => ({
		params: { product: slug },
		locale,
	}))

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const { products } = await request(allProductsQuery)
	const paths = (locales || [])
		.map((locale) => generatePathForLocale(locale as Locale, products))
		.flat(1)
	return {
		paths,
		fallback: false,
	}
}