import boxModel from './boxModel';
import isDocument from './isDocument';
import isWindow from './isWindow';
import { GeneralWindow } from './types';
import viewport from './viewport';

/**
 * Find the size of a DOM element, document or window including margins and borders
 *
 * @param elm - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // <div style="width: 200px; height: 300px; margin: 15px; padding: 10px; border-width: 2px;" />
 * marginBoxSize(div) // --> { width: 254, height: 354 }
 * ```
 */
export function marginBoxSize(elm: Document | GeneralWindow | HTMLElement) {
  if (isDocument(elm) || isWindow(elm)) {
    const vp = viewport(elm);
    if (!vp) return { width: 0, height: 0 };
    elm = vp;
  }

  const { margin } = boxModel(elm);

  return {
    width: elm.offsetWidth + margin.left + margin.right,
    height: elm.offsetHeight + margin.top + margin.bottom
  };
}

export default marginBoxSize;
