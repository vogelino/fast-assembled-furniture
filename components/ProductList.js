import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const shortenText = (text) => text.length > 80 ? `${text.slice(0, 80)}...` : text

const ProductListItem = ({
  slug,
  title = 'Untitled',
  startPrice = 10,
  description = 'No description yet.',
  thumbnail
}) => (
  <li>
    <Link href={`/${slug}`}>
      <a className='group grid grid-cols-1 border-black rounded-lg overflow-hidden border-2 hover:border-gray-300 transition-all'>
        {thumbnail && (
          <Image src={thumbnail.url} alt={title} layout='responsive' width='1000' height='600' objectFit='cover' />
        )}
        <div className='p-6 border-t-2 border-black group-hover:border-gray-300 transition-all'>
          <h3 className='font-bold text-xl'>{title}</h3>
          {startPrice && <h4 className='text-mmd mb-2'>Starting from {startPrice}€</h4>}
          <p className='text-sm mt-1 text-gray-400 mb-4'>{shortenText(description)}</p>
          <button className='transition-all bg-black font-bold border-2 rounded-full border-black group-hover:bg-transparent hover:bg-transparent group-hover:text-black hover:text-black hover:border-gray-300 text-white px-4 py-2'>Learn more</button>
        </div>
      </a>
    </Link>
  </li>
)

export default function ProductList ({ products }) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {products.map((product) => (
        <ProductListItem key={product.slug} {...product} />
      ))}
    </ul>
  )
}
