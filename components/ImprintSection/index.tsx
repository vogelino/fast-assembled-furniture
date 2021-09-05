import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { TextPage } from '@components/TextPage'

export const ImprintSection: FC = () => {
	const { t } = useTranslation('imprint')
	return (
		<TextPage
			text={t('text', {
				addressLine1: t('addressLine1'),
				addressLine2: t('addressLine2'),
				representative1: t('representative1'),
				representative2: t('representative2'),
				contactPhone: t('contactPhone'),
				contactEmail: t('contactEmail'),
				vatTaxID: t('vatTaxID'),
				businessID: t('businessID'),
			})}
		/>
	)
}
