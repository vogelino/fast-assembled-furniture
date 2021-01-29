import { useRef, useEffect } from 'react'

function useInterval(callback: () => void, delay = 1000): void {
	const savedCallback = useRef<() => void>()
	useEffect(() => {
		savedCallback.current = callback
	})
	useEffect(() => {
		function tick(): void {
			if (typeof savedCallback?.current !== 'undefined') {
				savedCallback.current()
			}
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
		return () => undefined
	}, [delay])
}

export default useInterval
