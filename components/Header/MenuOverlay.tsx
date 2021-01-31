import { FC } from 'react'

export const MenuOverlay: FC<{
	fixed: boolean
	isVisible: boolean
	onClick: () => void
}> = ({ onClick, fixed, isVisible }) => (
	<div
		className="gfc h-full z-0 relative"
		style={{
			paddingLeft: 0,
			background: 'none',
		}}
		onClick={onClick}
		onKeyPress={onClick}
		role="button"
		tabIndex={0}
	>
		<div
			className="top-0 right-0 left-0 bottom-0 bg-primary transition-opacity"
			style={{ opacity: isVisible ? 0.8 : 0, position: fixed ? 'fixed' : 'absolute' }}
		/>
		<div
			className="gf h-full"
			style={{ background: 'none', boxShadow: '0 0 0 10px var(--primary)' }}
		/>
	</div>
)
