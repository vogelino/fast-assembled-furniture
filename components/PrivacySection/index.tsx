import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TextPage } from '@components/TextPage'

export const PrivacySection: FC = () => {
	const { t } = useTranslation('privacy')
	return <TextPage text={t('text')} />
}
