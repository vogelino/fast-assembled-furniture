import { useEffect } from 'react'

const subscriptions: { [key: string]: ((evt?: Event) => void) | undefined } = {}

const onResize = (evt?: Event): void => {
	Object.values(subscriptions).map((sub) => {
		sub && sub(evt)
	})
}

export function useWindowResize(
	subscriptionKey: string,
	subscription: (evt?: Event) => void
): void {
	subscriptions[subscriptionKey] = subscription
	useEffect(() => {
		window.addEventListener('resize', onResize)
		onResize()
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])
}
