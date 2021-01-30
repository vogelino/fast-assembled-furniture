import { FC, createContext, useState } from 'react'

export enum BackgroundType {
	Transparent = 'Transparent',
	Light = 'Light',
	Dark = 'Dark',
}

type PreviewStateContextType = {
	previewBackground: BackgroundType
	setPreviewBackground: (background: BackgroundType) => void
	isResponsive: boolean
	setIsResponsive: (isResponsive: boolean) => void
}

const defaults = {
	previewBackground: BackgroundType.Transparent,
	setPreviewBackground: () => undefined,
	isResponsive: true,
	setIsResponsive: () => undefined,
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
				setIsResponsive: (isResponsive: boolean) =>
					setPreviewState({
						...previewState,
						isResponsive,
					}),
			}}
		>
			{children}
		</PreviewStateContext.Provider>
	)
}
