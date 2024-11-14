/**
 * Limit focus to focusable elements inside `element`
 * @param {HTMLElement} element - DOM element to focus trap inside
 * @return {Function} cleanup function
 */
export function focusTrap(element: HTMLElement) {
	const focusableElements = getFocusableElements(element)
	const firstFocusableEl = focusableElements[0]
	const lastFocusableEl: HTMLElement = focusableElements[focusableElements.length - 1]

	// Wait for the case the element was not yet rendered
	setTimeout(() => firstFocusableEl.focus(), 50)

	/**
	 * Get all focusable elements inside `element`
	 * @param {HTMLElement} element - DOM element to focus trap inside
	 * @return {HTMLElement[]} List of focusable elements
	 */
	function getFocusableElements(element = document as unknown as HTMLElement) {
		return [
			...element.querySelectorAll(
				'a, button, details, input, select, textarea, [tabindex]:not([tabindex="-1"])'
			),
		].filter((e) => !e.hasAttribute('disabled')) as HTMLElement[];
	}

	function handleKeyDown(e: KeyboardEvent) {
		const isTab = e.code.toLowerCase() === 'tab';

		if (!isTab) return

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus()
				e.preventDefault()
			}
		} else {
			if (document.activeElement === lastFocusableEl) {
				firstFocusableEl.focus()
				e.preventDefault()
			}
		}
	}

	element.addEventListener('keydown', handleKeyDown)

	return function cleanup() {
		element.removeEventListener('keydown', handleKeyDown)
	}
}
