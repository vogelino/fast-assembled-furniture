import { FC } from 'react'
import { Button } from '@components/SquareButton'
import { useRouter } from 'next/router'
import styles from './LanguageButton.module.css'

export const LanguageButton: FC = () => {
	const { locale, locales, asPath, push } = useRouter()
	const nextLocale = (locales?.filter((loc) => loc !== locale) || [locale])[0]
	return (
		<span className={[styles.container, 'relative h-full flex group'].join(' ')}>
			<Button
				type="button"
				icon={'MessageSquare'}
				onClick={() => push(asPath, asPath, { locale: nextLocale })}
			/>
			<span
				className={[
					styles.textWrapper,
					'absolute inset-0 flex items-center justify-center z-20',
					'uppercase font-bold text-xs leading-3 pointer-events-none',
				].join(' ')}
			>
				<span
					className={[styles.text, 'inline-block -mt-1.5 -ml-0.5 transform transition'].join(' ')}
				>
					{nextLocale}
				</span>
			</span>
		</span>
	)
}
