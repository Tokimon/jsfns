import getCurrentDocument from './getCurrentDocument';
import isWindow from './isWindow';
import type { GeneralWindow } from './types';


/**
 * Determines the relevant owner `window` object from a give node
 *
 * @param node - The node to determine the window from
 * @returns The owner window (if can be determined)
 *
 * @example
 *
 * ```ts
 * getCurrentWindow(document) // --> `window` the document belongs to
 * getCurrentWindow(window) // --> `window` directly
 * getCurrentWindow(myNode) // --> The `window` in which myNode resides
 * ```
 */
export function getCurrentWindow(node: Document | GeneralWindow | Node): null | GeneralWindow {
  if (isWindow(node)) return node;

  return getCurrentDocument(node)?.defaultView ?? null;
}

export default getCurrentWindow;
