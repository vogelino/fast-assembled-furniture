import { FC, createContext, useState, useEffect } from 'react'

interface LoadingContextType {
	isLoading: boolean
	startLoading: () => void
	stopLoading: () => void
}

export const LoadingContext = createContext<LoadingContextType>({
	isLoading: true,
	startLoading: () => undefined,
	stopLoading: () => undefined,
})

export const LoadingProvider: FC<{
	children: JSX.Element
}> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)

	const startLoading = (): void => {
		setIsLoading(true)
	}
	const stopLoading = (): void => {
		setIsLoading(false)
	}

	useEffect(() => {
		startLoading()
		return () => {
			stopLoading()
		}
	}, [])

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				startLoading,
				stopLoading,
			}}
		>
			{children}
		</LoadingContext.Provider>
	)
}
