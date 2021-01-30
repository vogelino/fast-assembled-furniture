import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { CSSProperties, FC } from 'react'

type LinkType = {
	href: string
	as?: string
	replace?: boolean
	scroll?: boolean
	shallow?: boolean
	passHref?: boolean
	prefetch?: boolean
	locale?: string | false
	activeClassName?: string
	inactiveClassName?: string
	className?: string
	onClick?: () => void
	style?: CSSProperties
}

const ActiveLink: FC<LinkType> = ({
	children,
	href,
	as,
	activeClassName = '',
	inactiveClassName = '',
	className: childClassName = '',
	onClick,
	style = {},
	...props
}) => {
	const { asPath } = useRouter()

	const className =
		asPath === href || asPath === as
			? `${childClassName} ${activeClassName}`.trim()
			: `${childClassName} ${inactiveClassName}`.trim()

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Link {...props} href={href}>
			<a href={href} style={style} className={`focus-ring ${className}`} onClick={onClick}>
				{children}
			</a>
		</Link>
	)
}

export default ActiveLink
