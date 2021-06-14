import { FC } from 'react'

export const InfoTable: FC<{ items: Record<string, string> }> = ({ items }) => (
	<table className="w-full">
		<tbody>
			{Object.keys(items).map((key) => (
				<tr key={key}>
					<td className="py-2 px-6 border-t border-primary20 font-semibold border-r w-32">{key}</td>
					<td className="py-2 px-3 border-t border-primary20">{items[key]}</td>
				</tr>
			))}
		</tbody>
	</table>
)
