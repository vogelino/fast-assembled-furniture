export const scrollToTargetAdjusted = (id: string): void => {
	const element = document.getElementById(id)
	const scrollParent = document.querySelector('.app-wrapper')
	if (!element || !scrollParent) return
	const isMobile = window.innerWidth < 640
	const headerOffset = isMobile ? -2 : 62
	const parentTop = scrollParent.getBoundingClientRect().top
	const elementTop = element.getBoundingClientRect().top
	const elementPosition = elementTop - parentTop
	const offsetPosition = elementPosition - headerOffset

	scrollParent.scrollTo({
		top: offsetPosition + scrollParent.scrollTop,
		behavior: 'smooth',
	})
}
