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
      <div style={{ maxWidth: 400 }}>
        {thumbnail && (
          <Image
            src={thumbnail.url}
            alt={title}
            layout='intrinsic'
            width={400}
            height={400}
          />
        )}
      </div>
      <h3>{title}</h3>
      <h4>Starting from {startPrice}€</h4>
      <p>{description}</p>
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
  const { product } = await request(individualProductQuery, {
    slug,
    locale: lang
  })
  return { props: mapProductToProps(product) }
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
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}
