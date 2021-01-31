import { FC } from 'react'
import Header from '@components/Header'
import { useWindowResize } from '@utils/hooks/useWindowResize'
import debounce from 'lodash.debounce'

const setVh = debounce((): void => {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}, 100)

const Layout: FC = ({ children }) => {
	useWindowResize('setVh', setVh)

	return (
		<div className="app-wrapper">
			<Header />
			{children}
		</div>
	)
}

export default Layout
