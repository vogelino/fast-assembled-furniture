import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { Button } from '@components/SquareButton'

const shortenText: (text: string) => string = (text) =>
	text.length > 80 ? `${text.slice(0, 80)}...` : text

export interface Thumbnail {
	slug?: string
	url: string
}

export interface Product {
	slug: string
	title: string
	startPrice: number
	description?: string
	thumbnail?: Thumbnail
	seoTitle?: string
	seoDescription?: string
	seoKeywords?: string[]
}

export interface Products {
	products: Product[]
}

const ProductListItem: FC<Product> = ({
	slug,
	title = 'Untitled',
	startPrice = 10,
	description = 'No description yet.',
	thumbnail,
}) => {
	const { t, lang } = useTranslation()
	const currency = new Intl.NumberFormat(lang, {
		style: 'currency',
		currency: 'EUR',
	})

	return (
		<Link href={`/${slug}`}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a
				className="group gfc hover:border-gray-300 w-full-p"
				style={{ paddingTop: 'calc(var(--borderWidth, 3px) * -1)' }}
			>
				{thumbnail && (
					<div className="gf">
						<Image
							src={thumbnail.url}
							alt={title}
							layout="responsive"
							width="1000"
							height="600"
							objectFit="cover"
						/>
					</div>
				)}
				<div className="gf p-6 group-hover:border-gray-300">
					<h3 className="font-bold text-xl">{title}</h3>
					{startPrice && (
						<h4 className="text-mmd mb-2">
							{t('product:priceStartingFrom', {
								price: currency.format(startPrice),
							})}
						</h4>
					)}
					<p className="text-sm mt-1 text-gray-400 mb-4">{shortenText(description)}</p>
					<Button type="button">{t('common:buttons.learnMore')}</Button>
				</div>
			</a>
		</Link>
	)
}

const ProductList: FC<Products> = ({ products }) => (
	<div
		className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
		style={{ paddingTop: 'var(--borderWidth, 3px)' }}
	>
		{products.map((product) => (
			<ProductListItem
				key={product.slug}
				slug={product.slug}
				description={product.description}
				startPrice={product.startPrice}
				thumbnail={product.thumbnail}
				title={product.title}
			/>
		))}
	</div>
)

export default ProductList
