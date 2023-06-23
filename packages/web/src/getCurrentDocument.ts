import { isDocument } from './isDocument';
import { isWindow } from './isWindow';
import type { GeneralWindow } from './types';

/**
 * Determines the relevant owner `document` object from a give node
 *
 * @param node - The node to determine the document from
 * @returns The owner document (if can be determined)
 *
 * @example
 *
 * ```ts
 * getCurrentDocument(document) // --> `document` directly
 * getCurrentDocument(window) // --> `window.document`
 * getCurrentDocument(myNode) // --> The `document` in which myNode resides
 * ```
 */
export function getCurrentDocument(node: Document | GeneralWindow | Node | null): Document | null {
  if (!node) return null;
  if (isDocument(node)) return node;
  if (isWindow(node)) return node.document;

  return node.ownerDocument;
}

export default getCurrentDocument;
