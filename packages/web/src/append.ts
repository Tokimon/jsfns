import { isString } from '@jsfns/core/isString.js';
import { ensureHTML } from './ensureHTML.js';
import { isDOMElement } from './isDOMElement.js';
import type { InsertResult } from './types.js';

/**
 * Append a DOM node to the end of `document.body`, or create an element from a CSS selector (or
 * from plain HTML) and append that instead
 *
 * @param insertElm - The DOM node to append, or HTML (or a CSS selector) describing the element to create and append
 * @returns The given node, or the created element with its type inferred from the leading tag name
 * (or `HTMLDivElement` when there is none) - see {@link InsertResult}
 *
 * @example
 *
 * ```ts
 * append(NodeToAppend) // --> appended to `document.body`, returns `NodeToAppend`
 * append('span') // --> appended to `document.body`, returns a `HTMLSpanElement`
 * append('<input type="text">') // --> appended to `document.body`, returns a `HTMLInputElement`
 * append('.my-class') // --> appended to `document.body`, returns a `HTMLDivElement`
 * ```
 */
function append<T extends Node | string>(insertElm: T): InsertResult<T> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and append it to the end of `document.body`,
 * with an explicit type for the rare case where {@link InsertResult}'s inference isn't accurate
 *
 * @param insertElm - HTML (or a CSS selector) describing the element to create and append
 * @returns The created element, typed as given
 *
 * @example
 *
 * ```ts
 * append<MyCustomElement>('<my-custom-element></my-custom-element>') // --> appended to `document.body`, returns a `MyCustomElement`
 * ```
 */
function append<E extends Element>(insertElm: string): E | null;

/**
 * Append a DOM node to the end of a given DOM element, or create an element from a CSS selector
 * (or from plain HTML) and append that instead
 *
 * @param root - The DOM element to append to
 * @param insertElm - The DOM node to append, or HTML (or a CSS selector) describing the element to create and append
 * @returns The given node, or the created element with its type inferred from the leading tag name
 * (or `HTMLDivElement` when there is none) - see {@link InsertResult}; either way `null` when `root`
 * is not a DOM element
 *
 * @example
 *
 * ```ts
 * append(MyNode, NodeToAppend) // --> returns `NodeToAppend`
 * append(MyNode, 'span') // --> returns a `HTMLSpanElement`
 * append(MyNode, '<input type="text">') // --> returns a `HTMLInputElement`
 * append(MyNode, '.my-class') // --> returns a `HTMLDivElement`
 * ```
 */
function append<R extends Element, T extends Node | string>(
	root: R,
	insertElm: T,
): InsertResult<T> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and append it to the end of a given DOM element,
 * with an explicit type for the rare case where {@link InsertResult}'s inference isn't accurate
 *
 * @param root - The DOM element to append to
 * @param insertElm - HTML (or a CSS selector) describing the element to create and append
 * @returns The created element, typed as given, or `null` when `root` is not a DOM element
 *
 * @example
 *
 * ```ts
 * append<MyCustomElement>(MyNode, '<my-custom-element></my-custom-element>') // --> returns a `MyCustomElement`
 * ```
 */
function append<E extends Element>(root: Element, insertElm: string): E | null;
function append(root: Node | string, insertElm?: Node | string): Node | null {
	if (insertElm === undefined) {
		insertElm = root;
		root = document.body;
	}

	if (!isDOMElement(root)) return null;

	if (isString(insertElm)) {
		root.insertAdjacentHTML('beforeend', ensureHTML(insertElm));
		return root.lastElementChild;
	}

	root.append(insertElm);
	return insertElm;
}

export { append };
export default append;
