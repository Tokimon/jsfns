import { css } from './css';
import { isDOMChildNode } from './isDOMChildNode';
import { viewport } from './viewport';

function getScrollParent(elm: Element, noStaticParent: boolean) {
	let parent = elm.parentElement;

	while (parent && parent !== document.body) {
		const { position, overflow, overflowX, overflowY } = css(parent);

		const scrollingOverFlow = /(auto|scroll)/.test(overflow + overflowY + overflowX);
		const includeParent = !(noStaticParent && position === 'static');

		if (includeParent && scrollingOverFlow) return parent;

		parent = parent.parentElement;
	}

	return null;
}

/**
 * Get the parent element that has scrolling
 *
 * @param elm - The element whose scroll parent is determined
 * @returns The scroll parent or the viewport
 *
 * @example
 *
 * ```ts
 * scrollParent(document.body) // --> `<html>`
 *
 * // <div style="overflow:auto"><p id="P" /></div>
 * scrollParent(document.getElementById('P')) // --> `<div>`
 *
 * // <div style="overflow:auto"><p id="P" style="position: fixed" /></div>
 * scrollParent(document.getElementById('P')) // --> `<html>`
 *
 * // <div style="overflow:auto"><p id="P" style="position: absolute" /></div>
 * scrollParent(document.getElementById('P')) // --> `<html>`
 *
 * // <div style="overflow:auto; position: relative"><p id="P" style="position: absolute" /></div>
 * scrollParent(document.getElementById('P')) // --> `<div>`
 * ```
 */
export function scrollParent(elm: Element): Element | HTMLElement | null {
	const vp = viewport(elm);

	if (!isDOMChildNode(elm) || elm === vp) return vp;

	const position = css(elm as HTMLElement, 'position');

	if (position === 'fixed') return vp;

	return getScrollParent(elm, position === 'absolute') ?? vp;
}

export default scrollParent;
