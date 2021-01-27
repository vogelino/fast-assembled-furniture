import { FC } from 'react'
import { PageTreeType } from './Menu'
import Breadcrumb from './Breadcrump'

type HeaderPropType = {
	pageTree: PageTreeType
}

const Header: FC<HeaderPropType> = ({ pageTree }) => {
	return (
		<div
			className="fixed top-0 right-0 h-16 gfc"
			style={{ left: `calc(20rem - var(--borderWidth, 3px))` }}
		>
			<div className="gf h-full-p p-4">
				<Breadcrumb pageTree={pageTree} />
			</div>
		</div>
	)
}

export default Header
