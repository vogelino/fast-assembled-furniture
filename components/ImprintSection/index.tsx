import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TextPage } from '@components/TextPage'

export const ImprintSection: FC = () => {
	const { t } = useTranslation('imprint')
	const { t: tCommon } = useTranslation('common')
	return <TextPage text={t('text', tCommon('legal', {}, { returnObjects: true }))} />
}
