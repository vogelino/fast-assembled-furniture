import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { markdownContainer } from './github-markdown.module.css'

const renderers = {
	code: ({ language, value }: { language: string; value: string }) => {
		return (
			<SyntaxHighlighter style={nord} language={language}>
				{value}
			</SyntaxHighlighter>
		)
	},
}

type PageTextZoneType = {
	children?: string
}

const PageTextZone: FC<PageTextZoneType> = ({ children = '' }) => (
	<div className={`${markdownContainer} p-8 pb-40 h-screen overflow-y-auto`}>
		<ReactMarkdown plugins={[gfm]} renderers={renderers}>
			{children}
		</ReactMarkdown>
	</div>
)

export default PageTextZone
