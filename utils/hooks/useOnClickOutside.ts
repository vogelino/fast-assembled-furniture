import { useEffect } from 'react'

type UseOnClickOutsideSignature = (
	ref: { current: HTMLDivElement | null },
	handler: (event: Event) => void
) => void

const useOnClickOutside: UseOnClickOutsideSignature = (ref, handler) => {
	useEffect(() => {
		const listener = (event: Event): void => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return
			}

			handler(event)
		}

		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}

export default useOnClickOutside
