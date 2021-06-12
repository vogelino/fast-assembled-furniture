import { render, screen } from '@testing-library/react'
import * as router from 'next/router'
import Layout from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.useRouter = jest.fn().mockReturnValue({
	asPath: '/',
})

describe('component Layout', () => {
	it('should render its children', () => {
		render(<Layout>Child</Layout>)
		expect(screen.getByText(/Child/gi)).toBeInTheDocument()
	})
})
