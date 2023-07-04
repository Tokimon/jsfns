import getCurrentWindow from './getCurrentWindow';
import isDOMNode from './isDOMNode';

/**
 * Is the given object a HTMLElement node
 *
 * @param obj - The object to check
 * @returns Is it a HTML element node
 *
 * @example
 *
 * ```ts
 * isHTMLElement(document.createElement('p')) // --> true
 * isHTMLElement(document.documentElement) // --> true
 * isHTMLElement(document.body) // --> true
 *
 * isHTMLElement(window) // --> false
 * isHTMLElement(document.createTextNode('')) // --> false
 * ```
 */
export const isHTMLElement = (obj: unknown): obj is HTMLElement => {
  if (!isDOMNode(obj)) return false;
  if (obj instanceof HTMLElement) return true;

  // For elements in an IFrame where elements are created using the types in the frame window
  const win = getCurrentWindow(obj);
  return win ? obj instanceof (win as typeof globalThis).HTMLElement : false;
};

export default isHTMLElement;
