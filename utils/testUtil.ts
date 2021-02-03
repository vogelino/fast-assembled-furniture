import { render } from '@testing-library/react'
import { Providers } from '../components/Providers'

const customRender: (ui: unknown, options?: { [key: string]: unknown }) => unknown = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ui: any,
	options = {}
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
