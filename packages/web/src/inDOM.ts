import { getCurrentDocument } from './getCurrentDocument';

/**
 * Is the given DOM node inserted into the DOM
 *
 * @param elm - The element to check
 * @returns Is it a DOM node in the DOM or not
 *
 * @example
 *
 * ```ts
 * inDOM(document.getElementById('my-elm')) // --> true
 * inDOM(document.createElement('div')) // --> false
 * ```
 */
export function inDOM(elm: Node): boolean {
	const doc = getCurrentDocument(elm);
	return !!doc && doc !== elm && doc.contains(elm);
}

export default inDOM;
