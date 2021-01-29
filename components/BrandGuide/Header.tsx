import { FC } from 'react'
import { PageTreeType } from '@components/BrandGuide/Menu'
import Breadcrumb from '@components/BrandGuide/Breadcrump'
import ThemeSelect from '../ThemeSelect'

type HeaderPropType = {
	pageTree: PageTreeType
}

const Header: FC<HeaderPropType> = ({ pageTree }) => {
	return (
		<div
			className="fixed top-0 right-0 h-16 gfc"
			style={{ left: `calc(20rem - var(--borderWidth, 3px))` }}
		>
			<div className="gf h-full-p px-6 py-4 flex justify-between items-center">
				<Breadcrumb pageTree={pageTree} />
				<div className="inline-grid gap-4 grid-cols-5">
					<ThemeSelect />
				</div>
			</div>
		</div>
	)
}

export default Header
