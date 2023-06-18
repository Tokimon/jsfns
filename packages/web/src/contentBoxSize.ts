import boxModel from './boxModel';
import isDocument from './isDocument';
import isWindow from './isWindow';
import { GeneralWindow } from './types';
import viewport from './viewport';

/**
 * Find the size of a DOM element, document or window excluding borders, margins and padding
 *
 * @param elm - The DOM element (or window) to find the size of
 * @returns Object describing width and height of the element
 */
export default (elm: Document | GeneralWindow | HTMLElement) => {
  if (isDocument(elm) || isWindow(elm)) {
    const vp = viewport(elm);
    if (!vp) return { width: 0, height: 0 };
    elm = vp;
  }

  const { padding } = boxModel(elm);

  return {
    width: elm.clientWidth - padding.left - padding.right,
    height: elm.clientHeight - padding.top - padding.bottom
  };
};
