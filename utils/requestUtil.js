import { request as gqlRequest } from 'graphql-request'

export async function request (query, variables = {}, stateMapper = (x) => x) {
  const data = await gqlRequest(process.env.API_URL, query, {
    stage: process.env.VERCEL_ENV === 'production' ? 'PUBLISHED' : 'DRAFT',
    ...variables
  })
  return stateMapper(data)
}
