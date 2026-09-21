import { isString } from '@jsfns/core/isString.js';
import { ensureHTML } from './ensureHTML.js';
import { isDOMChildNode } from './isDOMChildNode.js';
import type { InsertResult } from './types.js';

/**
 * Insert a DOM element after a given DOM element, or create an element from a CSS selector (or
 * from plain HTML) and insert that instead
 * (not possible when `elm` has no parent, e.g. it is detached or is the root `<html>` element)
 *
 * @param elm - The DOM element to insert after
 * @param insertElm - The DOM element to insert, or HTML (or a CSS selector) describing the element to create and insert
 * @returns The given element, or the created element with its type inferred from the leading tag
 * name (or `HTMLDivElement` when there is none) - see {@link InsertResult}; either way `null` when not possible
 *
 * @example
 *
 * ```ts
 * insertAfter(MyElm, ElementToInsert) // --> returns `ElementToInsert`
 * insertAfter(MyElm, 'span') // --> returns a `HTMLSpanElement`
 * insertAfter(MyElm, '<input type="text">') // --> returns a `HTMLInputElement`
 * insertAfter(MyElm, '.my-class') // --> returns a `HTMLDivElement`
 * ```
 */
function insertAfter<E extends Element, T extends Element | string>(
	elm: E,
	insertElm: T,
): InsertResult<T> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and insert it after a given DOM element,
 * with an explicit type for the rare case where {@link InsertResult}'s inference isn't accurate
 *
 * @param elm - The DOM element to insert after
 * @param insertElm - HTML (or a CSS selector) describing the element to create and insert
 * @returns The created element, typed as given, or `null` when not possible
 *
 * @example
 *
 * ```ts
 * insertAfter<MyCustomElement>(MyElm, '<my-custom-element></my-custom-element>') // --> returns a `MyCustomElement`
 * ```
 */
function insertAfter<E extends Element>(elm: Element, insertElm: string): E | null;
function insertAfter(elm: Element, insertElm: Element | string): Element | null {
	if (!isDOMChildNode(elm)) return null;

	if (isString(insertElm)) {
		elm.insertAdjacentHTML('afterend', ensureHTML(insertElm));
		return elm.nextElementSibling;
	}

	elm.insertAdjacentElement('afterend', insertElm);
	return insertElm;
}

export { insertAfter };
export default insertAfter;
