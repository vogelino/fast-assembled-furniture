import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TextPage } from '@components/TextPage'

export const AgbSection: FC = () => {
	const { t } = useTranslation('agb')
	return <TextPage text={t('text')} />
}
