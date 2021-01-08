import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LanguageSwitch: FC = () => {
	const router = useRouter()
	return (
		<ul className="inline-flex">
			{(router?.locales || []).map((locale) => (
				<li key={locale}>
					<Link href={router.asPath} locale={locale}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a
							className={`${
								router.locale === locale ? 'font-bold cursor-default' : 'hover:underline'
							} py-2 mr-4`}
						>
							{locale.toUpperCase()}
						</a>
					</Link>
				</li>
			))}
		</ul>
	)
}

export default LanguageSwitch
