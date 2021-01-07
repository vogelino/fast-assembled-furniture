import { request as gqlRequest } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';

function identity<T>(arg: T): T {
  return arg;
}

type PossibleKeys = 'products' | 'pages' | 'thumbnails' | 'product' | 'seoCommons';

type RequestSignature = (
  query: RequestDocument,
  variables?: { [key: string]: any },
  stateMapper?: <T>(x: T) => T
) => Promise<{ [key in PossibleKeys]: any }>;

export const request: RequestSignature = async (query, variables = {}, stateMapper = identity) => {
  const data = await gqlRequest(process.env.API_URL, query, {
    stage: process.env.VERCEL_ENV === 'production' ? 'PUBLISHED' : 'DRAFT',
    ...variables,
  });
  return stateMapper(data);
};
