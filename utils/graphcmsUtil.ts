import { Product, Thumbnail } from '../components/ProductList'

export interface RawProduct {
	slug: string
	title: string
	startPrice: number
	thumbnail?: Thumbnail
	seoTitle?: string
	seoDescription?: string
	seoKeywords?: string[]
	description: { markdown?: string }
}
export interface RawThumbnail {
	slug: string
	thumbnail: Thumbnail
}
export interface RawSeoPage {
	seoTitle?: string
	seoDescription?: string
	seoKeywords?: string[]
}
export interface RawSeoCommons {
	siteTitle?: string
	themeTextColor?: string
	twitterUsername?: string
}
export interface MappedSeoProps extends RawSeoCommons {
	title?: string
	description?: string
	keywords?: string[]
	thumbnail?: Thumbnail
}

export const mapProductToProps: (product: RawProduct) => Product = ({
	description,
	...product
}) => ({
	...product,
	description: description?.markdown || '',
})

export const mapProductsToProps: (
	products: RawProduct[],
	thumbnails?: RawThumbnail[]
) => Product[] = (products, thumbnails) =>
	products.map((product: RawProduct) => ({
		...mapProductToProps(product),
		...(thumbnails
			? {
					thumbnail: thumbnails.find((thumb) => thumb.slug === product.slug)?.thumbnail,
			  }
			: {}),
	}))

export const mapSeoToProps = ({
	pages,
	seoCommons,
}: {
	pages: RawSeoPage[]
	seoCommons: RawSeoCommons[]
}): MappedSeoProps => ({
	title: pages[0].seoTitle || '',
	description: pages[0].seoDescription || '',
	keywords: pages[0].seoKeywords || [],
	...seoCommons[0],
})
