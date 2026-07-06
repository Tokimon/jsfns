import { isDocument } from './isDocument.js';
import { isWindow } from './isWindow.js';
import type { GeneralWindow, Size } from './types.js';
import { viewport } from './viewport.js';

/**
 * Find the size of a DOM element, document or window including borders.
 * (Getting the size of the viewport if `document` is given)
 *
 * @param element - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 300px; margin: 10px; border: 2px solid;" />
 * outerSize(div) // --> { width: 224, height: 324 }
 *
 * outerSize(document) // --> [size of the viewport]
 * ```
 */
export function outerSize(element: Document | GeneralWindow | HTMLElement): Size {
	let elm = element;

	if (isWindow(elm)) return { width: elm.outerWidth, height: elm.outerHeight };

	if (isDocument(elm)) elm = viewport(elm);

	return { width: elm.offsetWidth, height: elm.offsetHeight };
}

export default outerSize;
