import { request as gqlRequest } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import { identity } from './functionsUtil'

type PossibleKeys = 'products' | 'pages' | 'thumbnails' | 'product' | 'seoCommons'

type RequestSignature = (
	query: RequestDocument,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	variables?: { [key: string]: any },
	stateMapper?: <T>(x: T) => T
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<{ [key in PossibleKeys]: any }>

const requestUrl = process.env.API_URL || 'http://localhost:8080'
export const request: RequestSignature = async (query, variables = {}, stateMapper = identity) => {
	const data = await gqlRequest(requestUrl, query, {
		stage: process.env.VERCEL_ENV === 'production' ? 'PUBLISHED' : 'DRAFT',
		...variables,
	})
	return stateMapper(data)
}
