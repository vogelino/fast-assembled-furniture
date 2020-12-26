import Head from "next/head";
import { gql } from "graphql-request";
import Image from "next/image";
import { request } from "../utils/requestUtil";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {products.map(({ slug, title, startPrice, description, thumbnail }) => (
          <li key={slug}>
            <Image src={thumbnail} alt={title} width={40} height={40} />
            <h3>{title}</h3>
            <h4>Starting from {startPrice}€</h4>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const query = gql`
  {
    products {
      slug
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

const mapDataToProps = ({ products }) => ({
  products: products.map(({ description, thumbnail, ...product }) => ({
    ...product,
    description: description.markdown,
    thumbnail: thumbnail.url,
  })),
});

export async function getStaticProps() {
  const props = await request(query);
  return { props: mapDataToProps(props) };
}
