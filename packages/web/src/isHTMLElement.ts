import getCurrentWindow from './getCurrentWindow.js';
import isDOMNode from './isDOMNode.js';
import isWindow from './isWindow.js';
import type { GlobalWindow } from './types.ts';

/**
 * Is the given object a HTMLElement node
 *
 * @param obj - The object to check
 * @returns Is it a HTML element node
 *
 * @example
 *
 * ```ts
 * isHTMLElement(document.createElement('p')) // --> true
 * isHTMLElement(document.documentElement) // --> true
 * isHTMLElement(document.body) // --> true
 *
 * isHTMLElement(window) // --> false
 * isHTMLElement(document.createTextNode('')) // --> false
 * ```
 */
export function isHTMLElement(obj: unknown): obj is HTMLElement {
	if (obj == null) return false;
	if (isWindow(obj)) return false;
	if (!isDOMNode(obj)) return false;
	if (obj instanceof HTMLElement) return true;

	// For elements in an IFrame where elements are created using the types in the frame window.
	// A foreign realm's globals are uncertain, so treat them as optional and feature-detect.
	const currentWindow = getCurrentWindow(obj) as Partial<GlobalWindow> | null;
	if (!currentWindow) return false;

	return !!currentWindow.HTMLElement && obj instanceof currentWindow.HTMLElement;
}

export default isHTMLElement;
