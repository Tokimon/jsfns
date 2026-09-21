import { insertAfter } from './insertAfter.js';
import type { InsertResult } from './types.js';

function findEmptyElm(elm: Element): Element {
	const child = elm?.firstElementChild;
	return child ? findEmptyElm(child) : elm;
}

/**
 * Wrap a given element in a DOM element, or in one created from a CSS selector (or from plain HTML)
 * (not possible when `elm` has no parent, e.g. it is detached or is the root `<html>` element)
 *
 * @param elm - The DOM element to wrap
 * @param wrapping - The DOM element to wrap `elm` with, or HTML (or a CSS selector) describing the element to create and wrap `elm` with
 * @returns The given wrapping element, or the created one with its type inferred from the leading
 * tag name (or `HTMLDivElement` when there is none) - see {@link InsertResult}; either way `null` when not possible
 *
 * @example
 *
 * ```ts
 * wrap(MyElm, WrapperElm) // --> returns `WrapperElm`, now wrapping `MyElm`
 * wrap(MyElm, '<div class="wrap-element"><span><b /></span></div>') // --> the wrapper - MyElm is inserted into the <b> tag
 * wrap(MyElm, '.wrap-element') // --> returns a `HTMLDivElement` wrapping `MyElm`
 * ```
 */
function wrap<T extends Element | string>(elm: Element, wrapping: T): InsertResult<T> | null;

/**
 * Create an element from a CSS selector (or from plain HTML) and wrap a given element with it,
 * with an explicit type for the rare case where {@link InsertResult}'s inference isn't accurate
 *
 * @param elm - The DOM element to wrap
 * @param wrapping - HTML (or a CSS selector) describing the element to create and wrap `elm` with
 * @returns The created wrapping element, typed as given, or `null` when not possible
 *
 * @example
 *
 * ```ts
 * wrap<MyCustomElement>(MyElm, '<my-custom-element></my-custom-element>') // --> returns a `MyCustomElement`
 * ```
 */
function wrap<E extends Element>(elm: Element, wrapping: string): E | null;
function wrap(elm: Element, wrapping: Element | string): Element | null {
	if (!wrapping) return null;

	const wrapperElement = insertAfter(elm, wrapping);
	if (wrapperElement) findEmptyElm(wrapperElement).appendChild(elm);

	return wrapperElement;
}

export { wrap };
export default wrap;
