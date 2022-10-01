import { FC } from 'react'
import Header from '@components/Header'

const Layout: FC<{
	children?: JSX.Element | JSX.Element[]
}> = ({ children }) => (
	<div className="container mx-auto pl-bd">
		<Header />
		{children}
	</div>
)

export default Layout
