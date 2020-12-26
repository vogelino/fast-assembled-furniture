import Head from "next/head";
import { gql } from "graphql-request";
import { request } from "../utils/requestUtil";
import { mapProductToProps } from "../utils/graphcmsUtil";
import ProductList from "../components/ProductList";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>FAF - Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        <ProductList products={products} />
      </ul>
    </div>
  );
}

const query = gql`
  query AllProductsHome($stage: Stage!) {
    products(stage: $stage) {
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
  products: products.map(mapProductToProps),
});

export async function getStaticProps() {
  const props = await request(query);
  return { props: mapDataToProps(props) };
}
