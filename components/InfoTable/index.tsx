import { ColorThemeContext } from '@components/ColorThemeContext'
import useTranslation from 'next-translate/useTranslation'
import { FC, useContext } from 'react'

interface InfoTablePropType {
	boxVersion: 'light' | 'dark'
}

interface TableCellPropType {
	bold?: boolean
}

const TableCell: FC<TableCellPropType> = ({ children, bold = false }) => (
	<div
		className={[
			'px-2 sm:px-3 md:px-4 lg:px-5 border-r border-b border-primary20 flex items-center content-center',
			'border-collapse h-12 leading-5 lg:col-span-1 last:rounded-br',
			bold && 'font-bold',
			bold ? 'col-span-2' : 'col-span-3',
		].join(' ')}
	>
		{children}
	</div>
)

export const InfoTable: FC<InfoTablePropType> = ({ boxVersion }) => {
	const { t } = useTranslation('home')
	const { themeKey } = useContext(ColorThemeContext)
	return (
		<div className="grid lg:grid-cols-12 border-t border-primary20 w-[calc(100%+2px)]">
			<div className="grid grid-cols-5 lg:grid-cols-[min-content,1fr] lg:col-span-7 content-start">
				<TableCell bold>{t('infoBox.labels.board')}</TableCell>
				<TableCell>{t('infoBox.woodTypes.coated')}</TableCell>
				<TableCell bold>{t('infoBox.labels.box')}</TableCell>
				<TableCell>{t(`infoBox.boxTypes.${boxVersion}`)}</TableCell>
				<TableCell bold>{t('infoBox.labels.strap')}</TableCell>
				<TableCell>{themeKey}</TableCell>
				<TableCell bold>{t('infoBox.labels.loadCapacity')}</TableCell>
				<TableCell>{t('infoBox.values.loadCapacity')}&#8239;kg</TableCell>
			</div>
			<div className="grid grid-cols-5 lg:grid-cols-[min-content,1fr] lg:col-span-5 content-start">
				<TableCell bold>{t('infoBox.labels.width')}</TableCell>
				<TableCell>{t('infoBox.values.width')}&#8239;cm</TableCell>
				<TableCell bold>{t('infoBox.labels.height')}</TableCell>
				<TableCell>{t('infoBox.values.height')}&#8239;cm</TableCell>
				<TableCell bold>{t('infoBox.labels.depth')}</TableCell>
				<TableCell>{t('infoBox.values.depth')}&#8239;cm</TableCell>
				<div className="text-2xl font-bold col-span-5 lg:col-span-2 row-span-4 p-8 text-right">
					{t('infoBox.values.price')}&#8239;€
				</div>
			</div>
		</div>
	)
}
