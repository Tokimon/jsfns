import { isString } from '@jsfns/core/isString';
import { ensureHTML } from './ensureHTML';
import { inDOM } from './inDOM';
import { isDOMRoot } from './isDOMRoot';

/**
 * Inserts DOM element or plain HTML before a given DOM element
 * (not possible for detached elements or the <html> element)
 *
 * @param elm - The DOM element to insert elements before
 * @param insertElm - DOM element or HTML (or selector) to insert
 * @returns The inserted element
 *
 * @example
 *
 * ```ts
 * insertBefore(document.documentElement, myInsertElm) // --> null (not possible)
 * insertBefore(document.createElement('div'), myInsertElm) // --> null (not possible)
 *
 * insertBefore(myElm, myInsertElm) // --> myInsertElement
 * insertBefore(myElm, '<div />') // --> <div />
 * insertBefore(myElm, '.inserted-element') // --> <div class="inserted-element" />
 * ```
 */
export function insertBefore(elm: Element, insertElm: string | Element): Element | null {
	if (!inDOM(elm) || isDOMRoot(elm)) {
		return null;
	}

	if (isString(insertElm)) {
		elm.insertAdjacentHTML('beforebegin', ensureHTML(insertElm));
	} else {
		elm.insertAdjacentElement('beforebegin', insertElm);
	}

	return elm.previousElementSibling;
}

export default insertBefore;
