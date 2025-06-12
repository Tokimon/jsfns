import { isDocument } from './isDocument';
import { isWindow } from './isWindow';
import type { GeneralWindow, Size } from './types';
import { viewport } from './viewport';

/**
 * Find the size of a DOM element, document or window excluding borders, margins and scrollbars.
 * Getting the size of the viewport if `document` or `window` is given.
 *
 * @param element - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 300px; margin: 15px; padding: 10px; border-width: 2px;" />
 * innerSize(div) // --> { width: 220, height: 320 }
 *
 * innerSize(window) // --> [size of the viewport]
 * innerSize(document) // --> [size of the viewport]
 * ```
 */
export function innerSize(element: Document | GeneralWindow | HTMLElement): Size {
	const elm = isDocument(element) || isWindow(element) ? viewport(element) : element;

	return { width: elm.clientWidth, height: elm.clientHeight };
}

export default innerSize;
