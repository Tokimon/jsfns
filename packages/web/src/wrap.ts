import { insertAfter } from './insertAfter.js';

function findEmptyElm(elm: Element): Element {
	const child = elm?.firstElementChild;
	return child ? findEmptyElm(child) : elm;
}

/**
 * Wrap a given element in the given HTML, selector or element
 *
 * @param elm - DOM element to wrap with the given HTML
 * @param wrapping - The HTML, selector or element to wrap the given element with
 *
 * @returns The wrapper element
 *
 * @example
 *
 * ```ts
 * wrap(document.documentElement, '<div />') // --> null - you cannot wrap the <html> element
 *
 * wrap(MyElm, document.createElement('div')) // --> <div>MyElm</div>
 * wrap(MyElm, '<div class="wrap-element"><span><b /></span></div>') // --> the wrapper - element inserted into the <b> tag
 * wrap(MyElm, '.wrap-element') // --> <div class="wrap-element">MyElm</div>
 * ```
 */
export function wrap(elm: Element, wrapping: Element | string): Element | null {
	if (!wrapping) return null;

	const wrapperElement = insertAfter(elm, wrapping);
	if (wrapperElement) findEmptyElm(wrapperElement).appendChild(elm);

	return wrapperElement;
}

export default wrap;
