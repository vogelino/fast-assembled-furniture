import { ColorThemeContext } from '@components/ColorThemeContext'
import { FC, useContext } from 'react'

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

export const InfoTable: FC = () => {
	const { themeKey } = useContext(ColorThemeContext)
	return (
		<div className="grid lg:grid-cols-12 border-t border-primary20 w-[calc(100%+2px)]">
			<div className="grid grid-cols-5 lg:grid-cols-[min-content,1fr] lg:col-span-7 content-start">
				<TableCell bold>Board</TableCell>
				<TableCell>Beschichtetes Holz</TableCell>
				<TableCell bold>Box</TableCell>
				<TableCell>Geöffnet & Grau</TableCell>
				<TableCell bold>Strap</TableCell>
				<TableCell>{themeKey}</TableCell>
				<TableCell bold>Tragfähigkeit</TableCell>
				<TableCell>20&#8239;kg</TableCell>
			</div>
			<div className="grid grid-cols-5 lg:grid-cols-[min-content,1fr] lg:col-span-5 content-start">
				<TableCell bold>Breite</TableCell>
				<TableCell>221&#8239;cm</TableCell>
				<TableCell bold>Höhe</TableCell>
				<TableCell>152&#8239;cm</TableCell>
				<TableCell bold>Tiefe</TableCell>
				<TableCell>152&#8239;cm</TableCell>
				<div className="text-2xl font-bold col-span-5 lg:col-span-2 row-span-4 p-8 text-right">
					999&#8239;€
				</div>
			</div>
		</div>
	)
}
