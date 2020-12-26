import Head from "next/head";
import { gql } from "graphql-request";
import { request } from "../../utils/requestUtil";
import ProductList from "../../components/ProductList";

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
  query AllProductsProducts {
    products {
      slug
      title
      description {
        markdown
      }
      startPrice
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
