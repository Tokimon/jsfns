import { boxModel } from './boxModel';
import { isDocument } from './isDocument';
import { isWindow } from './isWindow';
import type { GeneralWindow, Size } from './types';
import { viewport } from './viewport';

/**
 * Find the size of the content (scrollable area minus padding) of a DOM element, document or window
 * (Getting the size of the viewport if `document` or `window` is given)
 *
 * @param element - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 200px; margin: 10px; border: 2px solid; overflow: scroll">
 * //   <div style="height: 400px; width: 400px" />
 * // </div>
 * contentSize(div) // --> { width: 400, height: 400 }
 *
 * contentSize(window) // --> [size of the viewport]
 * contentSize(document) // --> [size of the viewport]
 * ```
 */
export function contentSize(element: Document | GeneralWindow | HTMLElement): Size {
	const elm = isDocument(element) || isWindow(element) ? viewport(element) : element;
	const { padding } = boxModel(elm);

	return {
		width: elm.scrollWidth - padding.left - padding.right,
		height: elm.scrollHeight - padding.top - padding.bottom,
	};
}

export default contentSize;
