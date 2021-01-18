import { FC } from 'react'
import Header from './Header'

const Layout: FC = ({ children }) => (
	<div className="container mx-auto">
		<Header />
		{children}
	</div>
)

export default Layout
