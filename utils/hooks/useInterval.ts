import { useRef, useEffect } from 'react'

function useInterval(callback: () => void, delay = 1000): void {
	const savedCallback = useRef<() => void>()
	useEffect(() => {
		savedCallback.current = callback
	})
	useEffect(() => {
		function tick() {
			if (typeof savedCallback?.current !== 'undefined') {
				savedCallback?.current()
			}
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {}
	}, [delay])
}

export default useInterval