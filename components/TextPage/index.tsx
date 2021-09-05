import { FC } from 'react'

export const TextPage: FC<{ text: string }> = ({ text }) => (
	<div className="w-full-p p-4 sm:p-6 md:p-8 mt-16">
		<div className="prose max-w-none text-primary" dangerouslySetInnerHTML={{ __html: text }} />
	</div>
)
