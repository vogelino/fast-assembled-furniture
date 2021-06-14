import { FC } from 'react'
import { InfoTable } from '@components/InfoTable'

interface PresetInfoPropType {
	title: string
	price: string
	table: Record<string, string>
}

export const PresetInfo: FC<PresetInfoPropType> = ({ title, price, table }) => (
	<div className="gf col-span-4 sm:col-span-3 row-span-2 md:row-span-1 md:col-span-2 flex flex-col justify-between">
		<div className="p-4 sm:p-6">
			<h3 className="text-2xl font-bold">{title}</h3>
			<p className="text-lg">{price}</p>
		</div>
		<InfoTable items={table} />
	</div>
)
