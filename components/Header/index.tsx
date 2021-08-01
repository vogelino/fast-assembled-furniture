import React, { FC, useContext } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Button } from '@components/SquareButton'
import ThemeSelect from '@components/ThemeSelect'
import { MenuContext } from '@components/MenuContext'
import { HeaderMenu } from '@components/HeaderMenu'
import { HeaderMenuOverlay } from '@components/HeaderMenuOverlay'
import styles from './Header.module.css'
import { BorderEdge } from '@components/BorderEdge'
import Link from '@components/Link'
import { logoPaths } from '@components/Logo'
import { LanguageButton } from '@components/LanguageButton'

const HeaderLogo: FC = () => (
	<Link href="/" className="flex flex-col sm:flex-row relative group">
		<>
			{[logoPaths.F, logoPaths.A, logoPaths.F].map((letter, idx) => (
				<span className="gf sm:w-16 h-16 sm:h-auto flex items-center justify-center" key={idx}>
					<svg viewBox="0 0 24 24" style={{ width: 32, height: 32 }}>
						<path d={letter} fillRule="evenodd" fill="currentColor" />
					</svg>
				</span>
			))}
			<span
				className={[
					'inset-0 absolute bg-primary cursor-pointer',
					'opacity-0 group-hover:opacity-50',
					'rounded cursor-pointer transition',
				].join(' ')}
			/>
		</>
	</Link>
)

const MenuContainer: FC<{ isOpened?: boolean; onClose?: () => void }> = ({
	children,
	isOpened = false,
	onClose = () => undefined,
}) => (
	<div
		className={[
			styles.menuWrapper,
			'fixed top-0 right-0 bottom-0 z-40 bg-none',
			isOpened ? 'pointer-events-auto' : 'pointer-events-none',
		].join(' ')}
	>
		<div
			className={[
				isOpened ? styles.menuContainerOpened : styles.menuContainerClosed,
				'container mx-auto relative w-full h-full-p grid gap-0 bg-none',
			].join(' ')}
		>
			{children}
			<HeaderMenuOverlay isOpened={isOpened} onClose={onClose} />
		</div>
	</div>
)

const Header: FC = () => {
	const { menuLinks, menuIsOpened, closeMenu, toggleMenu } = useContext(MenuContext)
	const { t } = useTranslation('common')

	return (
		<>
			<header
				className={[
					styles.container,
					styles.animatedContainer,
					!menuIsOpened && styles.containerClosed,
					'fixed top-0 left-0 gfc grid z-50',
					'container sm:left-1/2 sm:transform sm:-translate-x-1/2',
				]
					.filter(Boolean)
					.join(' ')}
			>
				<HeaderLogo />
				<div className="gf flex flex-col sm:flex-row pt-3 relative justify-start items-start sm:pl-3">
					<ThemeSelect />
					<div
						className={[
							'transform absolute uppercase font-bold',
							'left-2 sm:left-96',
							'-bottom-2 sm:bottom-1/2 sm:translate-y-1/2',
							'-rotate-90 sm:rotate-0',
							'origin-top-left whitespace-nowrap',
						].join(' ')}
					>
						<span className="hidden sm:inline">{menuIsOpened && t('menu.titleLong')}</span>
						<span className="hidden sm:inline">
							{!menuIsOpened &&
								menuLinks.reduce((acc, { active, textId }) => (active ? t(textId) : acc), '')}
						</span>
					</div>
				</div>
				<LanguageButton />
				<Button
					type="button"
					icon={menuIsOpened ? 'X' : 'Menu'}
					onClick={() => {
						toggleMenu()
					}}
				/>
			</header>
			<MenuContainer
				isOpened={Boolean(menuIsOpened)}
				onClose={() => {
					closeMenu()
				}}
			>
				{menuIsOpened && <HeaderMenu />}
			</MenuContainer>
			<div
				className={[
					styles.animatedContainer,
					'fixed hidden sm:block top-0 left-1/2',
					'container pointer-events-none h-8',
				].join(' ')}
			>
				<div className="relative w-full h-full">
					<BorderEdge
						orientation={'TopRight' as const}
						className="absolute top-0 left-bd transform -translate-x-full"
					/>
					<BorderEdge
						orientation={'TopLeft' as const}
						className="absolute top-0 right-bd transform translate-x-full"
					/>
				</div>
			</div>
		</>
	)
}

export default Header
