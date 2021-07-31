import { FC } from 'react'
import { Logo } from '@components/Logo'
import Menu, { PageTreeType } from '@components/BrandGuide/Menu'

const SidebarHeader: FC = () => (
	<div className="w-full-p bg-primary">
		<div className="w-full-p gf px-4 py-6">
			<Logo />
			<h1 className="w-full-p leading-6 mt-4 font-bold text-2xl uppercase">
				Fast
				<br />
				Assembled
				<br />
				Furniture
				<br />
				<span className="font-normal text-lg mt-2 block">Brand Assets</span>
			</h1>
		</div>
	</div>
)

const Sidebar: FC<{ pageTree: PageTreeType }> = ({ pageTree }) => (
	<div className="gfc w-80 h-full-p fixed top-0 left-0 bottom-0">
		<div
			className="gf h-full-p w-full-p grid grid-flow-row-dense"
			style={{ gridTemplateRows: 'auto auto 1fr' }}
		>
			<SidebarHeader />
			<Menu pageTree={pageTree} />
			<div className="w-full-p h-full-fr">
				<div className="gf h-full-p" />
			</div>
		</div>
	</div>
)

export default Sidebar
