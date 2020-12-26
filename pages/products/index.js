import Head from "next/head";
import { gql } from "graphql-request";
import { request } from "../../utils/requestUtil";
import ProductList from "../../components/ProductList";
import { mapProductToProps } from "../../utils/graphcmsUtil";

export default function Products({ products }) {
  return (
    <div>
      <Head>
        <title>FAF - Products</title>
      </Head>
      <ul>
        <ProductList products={products} />
      </ul>
    </div>
  );
}

const query = gql`
  query AllProductsProducts($stage: Stage!) {
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
