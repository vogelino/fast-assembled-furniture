import Head from "next/head";
import { request, gql } from "graphql-request";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {products.map(({ slug }) => (
          <li key={slug}>{slug}</li>
        ))}
      </ul>
    </div>
  );
}

const query = gql`
  {
    products {
      slug
    }
  }
`;

export async function getStaticProps() {
  const data = await request("http://localhost:1337/graphql", query);
  console.log(data);

  return { props: data };
}
