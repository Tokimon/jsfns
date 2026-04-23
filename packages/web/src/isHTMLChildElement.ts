import { isHTMLElement } from './isHTMLElement.js';

/** A HTML Element parent properties */
export type HTMLElementParentProps = 'offsetParent' | 'parentElement' | 'parentNode';

/** A HTML Element with DOM element parent */
export type HTMLChildElement = Omit<HTMLElement, HTMLElementParentProps> & {
	[K in HTMLElementParentProps]: NonNullable<HTMLElement[K]>;
};

/**
 * Is the given object a HTML element child of a DOM element
 *
 * @param obj - The object to check
 * @returns Is it a child HTMLElement or not
 *
 * @example
 *
 * ```ts
 * isHTMLChildElement(document.body) // --> true
 * isHTMLChildElement(document.getElementById('my-elm')) // --> true
 * isHTMLChildElement(createDetachedDocument().body) // --> true
 *
 * isHTMLChildElement(document.documentElement) // --> false
 * ```
 */
export function isHTMLChildElement(obj: unknown): obj is HTMLChildElement {
	return isHTMLElement(obj) && obj.offsetParent != null;
}

export default isHTMLChildElement;
