import { FC, createContext, useState } from 'react'

export enum BackgroundType {
	Transparent = 'Transparent',
	Light = 'Light',
	Dark = 'Dark',
}

type PreviewStateContextType = {
	previewBackground: BackgroundType
	setPreviewBackground: (background: BackgroundType) => void
}

const defaults = {
	previewBackground: BackgroundType.Transparent,
	setPreviewBackground: () => undefined,
}

export const PreviewStateContext = createContext<PreviewStateContextType>(defaults)

export const PreviewStateProvider: FC = ({ children }) => {
	const [previewState, setPreviewState] = useState(defaults)

	return (
		<PreviewStateContext.Provider
			value={{
				...previewState,
				setPreviewBackground: (previewBackground: BackgroundType) =>
					setPreviewState({
						...previewState,
						previewBackground,
					}),
			}}
		>
			{children}
		</PreviewStateContext.Provider>
	)
}
