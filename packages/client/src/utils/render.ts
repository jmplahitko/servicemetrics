
export function render(selector: string, content: string): Element | void {
	const el = document.querySelector(selector);

	if (el) {
		el.innerHTML = content;
		return el;
	}
}