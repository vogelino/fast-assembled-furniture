import { MenuContext } from '@components/MenuContext'
import { useContext, FC } from 'react'
import { Button } from '@components/SquareButton'
import { MenuContent } from './MenuContent'
import { CartContent } from './CartContent'
import { CartContext } from '@components/CartContext'

export const MenuArea: FC = () => {
	const { cartSize } = useContext(CartContext)
	const { menuIsOpened, cartIsOpened } = useContext(MenuContext)
	return (
		<div className="gfc h-full z-10 overflow-hidden relative" style={{ paddingLeft: 0 }}>
			<div
				className="absolute grid grid-flow-row w-full h-full"
				style={{
					minWidth: 256,
					top: 3,
					left: 0,
					gridTemplateRows:
						cartSize > 0 ? '1fr 67px' : 'calc(100% - (var(--borderWidth, 3px) * 2))',
				}}
			>
				<div className="focus-ring overflow-x-hidden overflow-y-auto border-bd rounded-lg -mt-bd -ml-bd w-full-p">
					{menuIsOpened && !cartIsOpened && <MenuContent />}
					{!menuIsOpened && cartIsOpened && <CartContent />}
				</div>
				{cartSize > 0 && (
					<Button type="button" colorType="Buy" className="w-full-p">
						Checkout <span className="inline-block text-sm font-normal">(599€)</span>
					</Button>
				)}
			</div>
		</div>
	)
}
