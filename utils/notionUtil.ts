import { BlockMapType } from 'react-notion'
import { NotionRendererProps } from 'react-notion/dist/renderer'

export const getNotionPage = (pageId: string) =>
	async function getNotionPageContent(): Promise<{
		props: Pick<NotionRendererProps, 'blockMap'>
	}> {
		const data = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`)
		const jsonData = (await data.json()) as BlockMapType

		return {
			props: {
				blockMap: jsonData,
			},
		}
	}
