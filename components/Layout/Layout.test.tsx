import { render, screen } from '@testing-library/react'
import Layout from '.'

describe('component Layout', () => {
	it('should render its children', () => {
		render(<Layout>Child</Layout>)
		expect(screen.getByText(/Child/gi)).toBeInTheDocument()
	})
})
