import isDocument from './isDocument';
import isWindow from './isWindow';
import { GeneralWindow } from './types';
import viewport from './viewport';

/**
 * Find the size of a DOM element, document or window including borders
 *
 * @param elm - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 300px; margin: 10px; border: 2px solid;" />
 * outerSize(div) // --> { width: 224, height: 324 }
 * ```
 */
export function outerSize(elm: Document | GeneralWindow | HTMLElement) {
  if (isWindow(elm)) return { width: elm.outerWidth, height: elm.outerHeight };
  if (isDocument(elm)) {
    const vp = viewport(elm);
    if (!vp) return { width: 0, height: 0 };
    elm = vp;
  }

  return { width: elm.offsetWidth, height: elm.offsetHeight };
}

export default outerSize;
