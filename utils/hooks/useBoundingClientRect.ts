import debounce from 'lodash.debounce'
import { useState, useRef, Ref } from 'react'
import { useWindowResize } from './useWindowResize'

type BoundingsType = {
	height?: number
	width?: number
	x?: number
	y?: number
	top?: number
	right?: number
	bottom?: number
	left?: number
}

let lastBoundings: BoundingsType | undefined

export function useBoundingClientRect(): {
	ref: Ref<HTMLDivElement>
	height?: number
} {
	const ref = useRef<HTMLDivElement>(null)
	const [boundingClientRect, setBoundingClientRect] = useState<BoundingsType | undefined>(
		lastBoundings
	)
	useWindowResize(
		'theme-select-height',
		debounce(() => {
			if (
				!ref.current ||
				!ref.current.getBoundingClientRect ||
				!ref.current.getBoundingClientRect()
			)
				return
			const boundings = ref.current.getBoundingClientRect()
			const newBoundings = {
				height: boundings.height,
				width: boundings.width,
				x: boundings.x,
				y: boundings.y,
				bottom: boundings.bottom,
				top: boundings.top,
				left: boundings.left,
			}
			lastBoundings = newBoundings
			setBoundingClientRect(newBoundings)
		}, 500)
	)

	return { ref, ...(boundingClientRect || {}) }
}
