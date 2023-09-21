import { boxModel } from './boxModel';
import { isDocument } from './isDocument';
import { isWindow } from './isWindow';
import { type GeneralWindow } from './types';
import { viewport } from './viewport';

/**
 * Find the size of a DOM element, document or window including margins and borders
 * (Getting the size of the viewport if `document` or `window` is given)
 *
 * @param elm - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 300px; margin: 15px; padding: 10px; border-width: 2px;" />
 * marginBoxSize(div) // --> { width: 254, height: 354 }
 *
 * marginBoxSize(window) // --> [size of the viewport]
 * marginBoxSize(document) // --> [size of the viewport]
 * ```
 */
export function marginBoxSize(elm: Document | GeneralWindow | HTMLElement) {
  if (isDocument(elm) || isWindow(elm)) elm = viewport(elm);

  const { margin } = boxModel(elm);

  return {
    width: elm.offsetWidth + margin.left + margin.right,
    height: elm.offsetHeight + margin.top + margin.bottom,
  };
}

export default marginBoxSize;
