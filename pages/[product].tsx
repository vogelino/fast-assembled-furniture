import { gql } from 'graphql-request'
import { useContext } from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MappedSeoProps, mapProductToProps, RawProduct, RawSeoCommons } from '@utils/graphcmsUtil'
import { request } from '@utils/requestUtil'
import { Button } from '@components/SquareButton'
import { CartContext } from '@components/CartContext'
import Layout from '@components/Layout'
import { Product, Thumbnail } from '@components/ProductList'

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
	const { cart, addCartItem, removeCartItem } = useContext(CartContext)
	const { t, lang } = useTranslation('product')

	const addToCart = (): void => addCartItem({ slug, title, startPrice, description, thumbnail })
	const removeFromCart = (): void => removeCartItem(slug)
	const currency = new Intl.NumberFormat(lang, {
		style: 'currency',
		currency: 'EUR',
	})

	return (
		<Layout>
			<main
				className="h-full-p grid grid-flow-row"
				style={{
					gridTemplateRows: 'auto 1fr',
				}}
			>
				{thumbnail && (
					<div className="gfc">
						<Image
							src={thumbnail.url}
							className="gf"
							alt={title}
							layout="responsive"
							width="1200"
							height="400"
							objectFit="cover"
						/>
					</div>
				)}
				<div className="gfc h-full-fr">
					<div className="gf h-full px-8 py-8">
						<h3 className="text-3xl md:text-4xl uppercase font-bold mb-0 bg-black text-white inline-block rounded-full">
							{title}
						</h3>
						{startPrice && (
							<h4 className="text-xl md:text-2xl mt-0 mb-4">
								{t('priceStartingFrom', { price: currency.format(startPrice) })}
							</h4>
						)}
						<p className="text-2xl md:text-3xl mt-4">{description}</p>
						<p className="mt-4">
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
					</div>
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

const generatePathForLocale = (
	locale: Locale,
	products: Product[]
): Array<{
	params: { product: string }
	locale: Locale
}> =>
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
