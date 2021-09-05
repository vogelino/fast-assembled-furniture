import ActiveLink from '@components/Link'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export const TextPage: FC<{ text: string }> = ({ text }) => {
	const { t } = useTranslation('common')
	return (
		<div className="w-full-p p-4 sm:p-6 md:p-8 mt-4">
			<ActiveLink
				href="/"
				className="mb-16 inline-block opacity-50 hover:opacity-100 transition-opacity"
			>
				{`<-`}
				<span className="ml-2 pb-0.5 border-b border-primary">{t('backLinkText')}</span>
			</ActiveLink>
			<div className="prose max-w-none text-primary" dangerouslySetInnerHTML={{ __html: text }} />
		</div>
	)
}
