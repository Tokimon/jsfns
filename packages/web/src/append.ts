import { isString } from '@jsfns/core/isString.js';
import { ensureHTML } from './ensureHTML.js';
import { isDOMElement } from './isDOMElement.js';

/**
 * The DOM element type for a given HTML or selector string: exact for a bare tag
 * name (e.g. `'span'`), otherwise `div` - the same default `parseSelector` and
 * `createElement` fall back to for anything without one explicit leading tag name.
 * Pass an explicit type argument (e.g. `append<HTMLInputElement>(...)`) to override
 * this default for markup this can't reflect, such as `'<input type="text">'`.
 */
export type ElementFromMarkup<S extends string> = S extends keyof HTMLElementTagNameMap
	? HTMLElementTagNameMap[S]
	: HTMLDivElement;

/**
 * Append a DOM node to the end of `document.body` and return that same node reference
 *
 * @param insertElm - The DOM node to append
 * @returns The given node
 *
 * @example
 *
 * ```ts
 * append(NodeToAppend) // --> appended to `document.body`, returns `NodeToAppend`
 * ```
 */
function append<E extends Node>(insertElm: E): E | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and append it to the end of `document.body`
 *
 * @param insertElm - HTML (or a CSS selector) describing the element to create and append
 * @returns The created element - typed exactly for a bare tag name (e.g. `'span'`), otherwise `HTMLDivElement` (see {@link ElementFromMarkup})
 *
 * @example
 *
 * ```ts
 * append('span') // --> appended to `document.body`, returns a `HTMLSpanElement`
 * append('.my-class') // --> appended to `document.body`, returns a `HTMLDivElement`
 * ```
 */
function append<S extends string>(insertElm: S): ElementFromMarkup<S> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and append it to the end of `document.body`,
 * with an explicit type for markup {@link ElementFromMarkup}'s automatic inference can't reflect
 *
 * @param insertElm - HTML (or a CSS selector) describing the element to create and append
 * @returns The created element, typed as given
 *
 * @example
 *
 * ```ts
 * append<HTMLInputElement>('<input type="text">') // --> appended to `document.body`, returns a `HTMLInputElement`
 * ```
 */
function append<E extends Element>(insertElm: string): E | null;

/**
 * Append a DOM node to the end of a given DOM element and return that same node reference
 *
 * @param root - The DOM element to append to
 * @param insertElm - The DOM node to append
 * @returns The given node, or `null` when `root` is not a DOM element
 *
 * @example
 *
 * ```ts
 * append(MyNode, NodeToAppend) // --> returns `NodeToAppend`
 * ```
 */
function append<R extends Element, E extends Node>(root: R, insertElm: E): E | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and append it to the end of a given DOM element
 *
 * @param root - The DOM element to append to
 * @param insertElm - HTML (or a CSS selector) describing the element to create and append
 * @returns The created element, or `null` when `root` is not a DOM element - typed exactly for a bare tag name (e.g. `'span'`), otherwise `HTMLDivElement` (see {@link ElementFromMarkup})
 *
 * @example
 *
 * ```ts
 * append(MyNode, 'span') // --> returns a `HTMLSpanElement`
 * append(MyNode, '.my-class') // --> returns a `HTMLDivElement`
 * ```
 */
function append<R extends Element, S extends string>(
	root: R,
	insertElm: S,
): ElementFromMarkup<S> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and append it to the end of a given DOM element,
 * with an explicit type for markup {@link ElementFromMarkup}'s automatic inference can't reflect
 *
 * @param root - The DOM element to append to
 * @param insertElm - HTML (or a CSS selector) describing the element to create and append
 * @returns The created element, typed as given, or `null` when `root` is not a DOM element
 *
 * @example
 *
 * ```ts
 * append<HTMLInputElement>(MyNode, '<input type="text">') // --> returns a `HTMLInputElement`
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
