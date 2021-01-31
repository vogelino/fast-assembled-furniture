import { useState, useRef, useEffect, Ref } from 'react'
import debounce from 'lodash.debounce'

export function useHeight(): { ref: Ref<HTMLDivElement>; height?: number } {
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState<number | undefined>()

	const onResize = debounce(() => {
		if (
			!ref.current ||
			!ref.current.getBoundingClientRect ||
			!ref.current.getBoundingClientRect().height
		)
			return
		setHeight(ref.current.getBoundingClientRect().height || undefined)
	}, 500)

	useEffect(() => {
		window.addEventListener('resize', onResize)
		onResize()
		return () => {
			window.removeEventListener('resize', onResize)
		}
	})

	return { ref, height }
}
