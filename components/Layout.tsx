import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import LanguageSwitch from './LanguageSwitch'
import Cart from './Cart'

const Layout: FC = ({ children }) => {
	const router = useRouter()
	const { t } = useTranslation('common')

	return (
		<div className="container mx-auto p-4">
			<header className="flex place-content-between items-center mb-4">
				<Link href="/" locale={router.locale}>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a>
						<h2 className="font-bold">{t('pages.home')}</h2>
					</a>
				</Link>
				<div>
					<Cart />
					<LanguageSwitch />
				</div>
			</header>
			{children}
		</div>
	)
}

export default Layout
