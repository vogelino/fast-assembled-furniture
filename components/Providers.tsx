import { FC } from 'react'
import { CartProvider } from '@components/CartContext'
import { LoadingProvider } from '@components/LoadingContext'
import { ColorThemeProvider } from '@components/ColorThemeContext'
import { MenuProvider } from '@components/MenuContext'

export const Providers: FC = ({ children }) => (
	<ColorThemeProvider>
		<LoadingProvider>
			<CartProvider>
				<MenuProvider>{children}</MenuProvider>
			</CartProvider>
		</LoadingProvider>
	</ColorThemeProvider>
)
