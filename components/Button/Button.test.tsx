import { render, screen } from '@utils/testUtil'
import Button from './'
jest.mock('next/router', (): { useRouter: () => void } => ({
	useRouter: jest.fn().mockImplementation((): { asPath: string } => ({
		asPath: '/',
	})),
}))

describe('Button', () => {
	it('should render without crashing', () => {
		render(<Button type="button" />)
		const button = screen.getByRole('button')

		expect(button).toBeInTheDocument()
	})
})
