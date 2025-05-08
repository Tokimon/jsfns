import { insertAfter } from './insertAfter';

function findEmptyElm(elm: Element): Element {
	const child = elm?.firstElementChild;
	return child ? findEmptyElm(child) : elm;
}

/**
 * Wrap a given element in the given HTML, selector or element
 *
 * @param elm - DOM element to wrap with the given HTML
 * @param wrapping - The HTML, selector or element to wrap the given element with
 * @return If the wrapping was successful or not
 *
 * @example
 *
 * ```ts
 * wrap(document.documentElement, '<div />') // --> false - you cannot wrap the <html> element
 *
 * wrap(MyElm, document.createElement('div')) // --> true
 * wrap(MyElm, '<div class="wrap-element"><span><b /></span></div>') // --> true - element inserted into the <b> tag
 * wrap(MyElm, '.wrap-element') // --> true
 * ```
 */
export function wrap(elm: Element, wrapping: Element | string) {
	if (!wrapping) return null;

	const wrapDom = insertAfter(elm, wrapping);
	if (!wrapDom) return null;

	findEmptyElm(wrapDom).appendChild(elm);

	return wrapDom;
}

export default wrap;
