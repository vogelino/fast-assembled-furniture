import { request as gqlRequest } from "graphql-request";

export async function request(query, stateMapper = (x) => x) {
  const data = await gqlRequest(process.env.API_URL, query);
  return stateMapper(data);
}
