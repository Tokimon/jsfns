import { isString } from '@jsfns/core/isString.js';
import { ensureHTML } from './ensureHTML.js';
import { isDOMElement } from './isDOMElement.js';
import type { InsertResult } from './types.js';

/**
 * Prepend a DOM node to the beginning of `document.body`, or create an element from a CSS selector
 * (or from plain HTML) and prepend that instead
 *
 * @param insertElm - The DOM node to prepend, or HTML (or a CSS selector) describing the element to create and prepend
 * @returns The given node, or the created element with its type inferred from the leading tag name
 * (or `HTMLDivElement` when there is none) - see {@link InsertResult}
 *
 * @example
 *
 * ```ts
 * prepend(NodeToPrepend) // --> prepended to `document.body`, returns `NodeToPrepend`
 * prepend('span') // --> prepended to `document.body`, returns a `HTMLSpanElement`
 * prepend('<input type="text">') // --> prepended to `document.body`, returns a `HTMLInputElement`
 * prepend('.my-class') // --> prepended to `document.body`, returns a `HTMLDivElement`
 * ```
 */
function prepend<T extends Node | string>(insertElm: T): InsertResult<T> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and prepend it to the beginning of `document.body`,
 * with an explicit type for the rare case where {@link InsertResult}'s inference isn't accurate
 *
 * @param insertElm - HTML (or a CSS selector) describing the element to create and prepend
 * @returns The created element, typed as given
 *
 * @example
 *
 * ```ts
 * prepend<MyCustomElement>('<my-custom-element></my-custom-element>') // --> prepended to `document.body`, returns a `MyCustomElement`
 * ```
 */
function prepend<E extends Element>(insertElm: string): E | null;

/**
 * Prepend a DOM node to the beginning of a given DOM element, or create an element from a CSS
 * selector (or from plain HTML) and prepend that instead
 *
 * @param root - The DOM element to prepend to
 * @param insertElm - The DOM node to prepend, or HTML (or a CSS selector) describing the element to create and prepend
 * @returns The given node, or the created element with its type inferred from the leading tag name
 * (or `HTMLDivElement` when there is none) - see {@link InsertResult}; either way `null` when `root`
 * is not a DOM element
 *
 * @example
 *
 * ```ts
 * prepend(MyNode, NodeToPrepend) // --> returns `NodeToPrepend`
 * prepend(MyNode, 'span') // --> returns a `HTMLSpanElement`
 * prepend(MyNode, '<input type="text">') // --> returns a `HTMLInputElement`
 * prepend(MyNode, '.my-class') // --> returns a `HTMLDivElement`
 * ```
 */
function prepend<R extends Element, T extends Node | string>(
	root: R,
	insertElm: T,
): InsertResult<T> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and prepend it to the beginning of a given DOM element,
 * with an explicit type for the rare case where {@link InsertResult}'s inference isn't accurate
 *
 * @param root - The DOM element to prepend to
 * @param insertElm - HTML (or a CSS selector) describing the element to create and prepend
 * @returns The created element, typed as given, or `null` when `root` is not a DOM element
 *
 * @example
 *
 * ```ts
 * prepend<MyCustomElement>(MyNode, '<my-custom-element></my-custom-element>') // --> returns a `MyCustomElement`
 * ```
 */
function prepend<E extends Element>(root: Element, insertElm: string): E | null;
function prepend(root: Node | string, insertElm?: Node | string): Node | null {
	if (insertElm === undefined) {
		insertElm = root;
		root = document.body;
	}

	if (!isDOMElement(root)) return null;

	if (isString(insertElm)) {
		root.insertAdjacentHTML('afterbegin', ensureHTML(insertElm));
		return root.firstElementChild;
	}

	root.prepend(insertElm);
	return insertElm;
}

export { prepend };
export default prepend;
