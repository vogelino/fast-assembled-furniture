import { Logo } from '@components/Logo'
import Link from '@components/Link'
import { MenuContext } from '@components/MenuContext'
import useTranslation from 'next-translate/useTranslation'
import { FC, useContext } from 'react'

const year = new Date().getFullYear()

export const Footer: FC = () => {
	const { secondaryLinks } = useContext(MenuContext)
	const { t } = useTranslation('common')

	return (
		<footer className="px-4 sm:px-8 py-12 flex gap-x-8 gap-y-6 justify-between flex-wrap">
			<Logo />
			<ul className="inline-flex gap-8 gap-x-8 gap-y-1 flex-wrap">
				{secondaryLinks.map(({ path, textId }) => (
					<li className="underline opacity-50" key={path}>
						<Link href={path} activeClassName="no-underline">
							{t(textId)}
						</Link>
					</li>
				))}
			</ul>
			<small className="opacity-50 flex gap-x-4 gap-y-1 flex-wrap">
				<span className="whitespace-nowrap">© {year} Fast Assembled Furniture</span>
				{/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
				<span className="whitespace-nowrap">
					🌐 by{' '}
					<a
						href="https://vogelino.com"
						title="Portfolio of Lucas Vogel, creator of this website"
						className="underline hover:no-underline cursor-pointer"
					>
						vogelino
					</a>
				</span>
				{/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
				<span className="whitespace-nowrap">
					📷 by{' '}
					<a
						href="https://www.instagram.com/olimagda/"
						title="Instagram of Oliver Magda, photograph of the pictures in this website"
						className="underline hover:no-underline cursor-pointer"
					>
						Oliver Magda
					</a>
				</span>
			</small>
		</footer>
	)
}
