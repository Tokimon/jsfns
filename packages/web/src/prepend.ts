import { isString } from '@jsfns/core/isString';
import { ensureHTML } from './ensureHTML';

/**
 * Append DOM element or plain HTML to the beginning of a given DOM element
 *
 * @param elm - The DOM element to prepend to
 * @param insertElm - DOM element or HTML (or selector) to prepend to
 * @returns The inserted child element
 *
 * @example
 *
 * ```ts
 * prepend(MyNode, NodeToPrepend)
 * prepend(MyNode, '<span>prepended</span>')
 * prepend(MyNode, '.my-prepended-element')
 * ```
 */
export function prepend(elm: Element, insertElm: string | Node): Element | null {
	if (!elm) return null;

	if (isString(insertElm)) {
		elm.insertAdjacentHTML('afterbegin', ensureHTML(insertElm));
	} else {
		elm.prepend(insertElm);
	}

	return elm.firstElementChild;
}

export default prepend;
