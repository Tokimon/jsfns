import { getCurrentDocument } from './getCurrentDocument.js';
import { isDOMNode } from './isDOMNode.js';

/**
 * Is the given object root node of the DOM (eg `<html>` for HTML documents og `<svg>` for SVG documents)
 *
 * @param obj - The object to check
 * @returns Is it the root node of the DOM or not
 *
 * @example
 *
 * ```ts
 * isDOMRoot(document.documentElement) // --> true
 *
 * isDOMRoot(document.body) // --> false
 * isDOMRoot(document) // --> false
 * isDOMRoot(window) // --> false
 * ```
 */
export function isDOMRoot(obj: unknown): obj is HTMLElement {
	if (!isDOMNode(obj)) return false;

	const doc = getCurrentDocument(obj);
	return !!doc && obj === doc.documentElement;
}

export default isDOMRoot;
