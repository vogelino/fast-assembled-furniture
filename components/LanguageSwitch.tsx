import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

const LanguageSwitch: FC = () => {
	const router = useRouter()
	return (
		<ul className="inline-flex">
			{(router?.locales || []).map((locale) => (
				<li key={locale}>
					<Link
						href={router.asPath}
						locale={locale}
						className={`${
							router.locale === locale ? 'font-bold cursor-default' : 'hover:underline'
						} py-2 mr-4`}
					>
						{locale.toUpperCase()}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default LanguageSwitch
