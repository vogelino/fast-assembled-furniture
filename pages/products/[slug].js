import { gql } from "graphql-request";
import React from "react";
import Image from "next/image";
import { mapProductToProps } from "../../utils/graphcmsUtil";
import { request } from "../../utils/requestUtil";

export default function ProductPage({
  title,
  startPrice,
  description,
  thumbnail,
}) {
  return (
    <main>
      <div style={{ maxWidth: 400 }}>
        <Image
          src={thumbnail.url}
          alt={title}
          layout="intrinsic"
          width={400}
          height={400}
        />
      </div>
      <h3>{title}</h3>
      <h4>Starting from {startPrice}€</h4>
      <p>{description}</p>
    </main>
  );
}

const individualProductQuery = gql`
  query IndividualProduct($slug: String!) {
    product(where: { slug: $slug }) {
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
`;

export async function getStaticProps({ params: { slug } }) {
  const { product } = await request(individualProductQuery, { slug });
  return { props: mapProductToProps(product) };
}

const allProductsQuery = gql`
  query AllProductsPagePaths {
    products {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { products } = await request(allProductsQuery);
  return {
    paths: products.map(({ slug }) => ({
      params: { slug: String(slug) },
    })),
    fallback: false,
  };
}
