import { useEffect, FC } from 'react'
import Header from '@/components/Header'

const setVh = () => {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const Layout: FC = ({ children }) => {
	useEffect(() => {
		setVh()
		window.addEventListener('resize', setVh)

		return () => {
			window.removeEventListener('resize', setVh)
		}
	}, [])

	return (
		<div className="container mx-auto">
			<Header />
			{children}
		</div>
	)
}

export default Layout
