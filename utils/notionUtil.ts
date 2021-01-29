import { NotionRendererProps } from 'react-notion/dist/renderer'

export const getNotionPage = (pageId: string) =>
	async function getNotionPageContent(): Promise<{
		props: Pick<NotionRendererProps, 'blockMap'>
	}> {
		const data = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`).then((res) =>
			res.json()
		)

		return {
			props: {
				blockMap: data,
			},
		}
	}
