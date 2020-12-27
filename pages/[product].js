import { gql } from 'graphql-request'
import React from 'react'
import Image from 'next/image'
import { mapProductToProps } from '../utils/graphcmsUtil'
import { request } from '../utils/requestUtil'

export default function ProductPage ({
  title,
  startPrice,
  description,
  thumbnail
}) {
  return (
    <main>
        {thumbnail && (
          <div className="rounded-xl overflow-hidden border-2 border-black">
            <Image
            src={thumbnail.url}
            alt={title}
            layout='responsive'
            width='1000'
            height='600'
            objectFit='cover'
          />
          </div>
        )}
      <div className='px-6 py-8'>
        <h3 className='text-6xl font-bold px-6 py-2 mb-4 bg-black text-white inline-block rounded-full'>{title}</h3>
        {startPrice && <h4 className='text-2xl pl-6'>Starting from {startPrice}€</h4>}
        <p className='text-3xl mt-4 pl-6'>{description}</p>
      </div>
    </main>
  )
}

const individualProductQuery = gql`
  query IndividualProduct($slug: String!, $stage: Stage!, $locale: Locale!) {
    product(where: { slug: $slug }, stage: $stage, locales: [$locale]) {
      title
      description {
        markdown
      }
      startPrice
      isConfigurable
    }
    thumb: product(where: { slug: $slug }, stage: $stage) {
      thumbnail {
        url
      }
    }
  }
`

export async function getStaticProps ({
  params: { product: slug },
  locale,
  defaultLocale
}) {
  const lang = locale || defaultLocale
  const { product, thumb: { thumbnail } } = await request(individualProductQuery, {
    slug,
    locale: lang
  })
  return { props: {
    ...mapProductToProps(product),
    thumbnail
  } }
}

const allProductsQuery = gql`
  query AllProductsPagePaths($stage: Stage!) {
    products(stage: $stage) {
      slug
    }
  }
`

const generatePathForLocale = (locale, products) =>
  products.map(({ slug }) => ({
    params: { product: slug },
    locale
  }))

export async function getStaticPaths ({ locales }) {
  const { products } = await request(allProductsQuery)
  const paths = locales
    .map((locale) => generatePathForLocale(locale, products))
    .flat(1)
  return {
    paths,
    fallback: false
  }
}
