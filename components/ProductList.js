import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ProductListItem = ({
  slug,
  title,
  startPrice,
  description,
  thumbnail
}) => (
  <li>
    <Link href={`/${slug}`}>
      <a>
        {thumbnail && (
          <Image src={thumbnail.url} alt={title} width={40} height={40} />
        )}
        <h3>{title}</h3>
        <h4>Starting from {startPrice}€</h4>
        <p>{description}</p>
      </a>
    </Link>
  </li>
)

export default function ProductList ({ products }) {
  return (
    <>
      {products.map((product) => (
        <ProductListItem key={product.slug} {...product} />
      ))}
    </>
  )
}
