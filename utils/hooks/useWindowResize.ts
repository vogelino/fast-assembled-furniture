import { useEffect } from 'react'

const subscriptions: { [key: string]: (evt?: Event) => void } = {}

const onResize = (evt?: Event): void => {
	Object.values(subscriptions).map((sub) => {
		sub(evt)
	})
}

export function useWindowResize(
	subscriptionKey: string,
	subscription: (evt?: Event) => void
): () => void {
	if (!subscriptions[subscriptionKey]) {
		subscriptions[subscriptionKey] = subscription
	}

	useEffect(() => {
		window.addEventListener('resize', onResize)
		onResize()
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	return () => {
		delete subscriptions[subscriptionKey]
	}
}
