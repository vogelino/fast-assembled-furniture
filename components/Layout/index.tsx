import { FC } from 'react'
import Header from '@components/Header'

const Layout: FC = ({ children }) => (
	<div className="container mx-auto pl-bd">
		<Header />
		{children}
	</div>
)

export default Layout
