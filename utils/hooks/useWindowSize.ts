import { useEffect, useState } from 'react'

interface WindowSize {
	width: number
	height: number
}

export function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		const handler = (): void => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		handler()

		window.addEventListener('resize', handler)

		return () => {
			window.removeEventListener('resize', handler)
		}
	}, [])

	return windowSize
}

export default useWindowSize
