import { boxModel } from './boxModel';
import { isDocument } from './isDocument';
import { isWindow } from './isWindow';
import { viewport } from './viewport';
import type { GeneralWindow } from './types';

/**
 * Find the size of a DOM element, document or window excluding borders, margins and padding
 * (Getting the size of the viewport if `document` or `window` is given)
 *
 * @param elm - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 300px; margin: 10px; border: 2px solid;" />
 * contentBoxSize(div) // --> { width: 200, height: 300 }
 *
 * contentBoxSize(window) // --> [size of the viewport]
 * contentBoxSize(document) // --> [size of the viewport]
 * ```
 */
export function contentBoxSize(element: Document | GeneralWindow | HTMLElement) {
	const elm = isDocument(element) || isWindow(element) ? viewport(element) : element;
	const { padding } = boxModel(elm);

	return {
		width: elm.clientWidth - padding.left - padding.right,
		height: elm.clientHeight - padding.top - padding.bottom,
	};
}

export default contentBoxSize;
