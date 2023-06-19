import getCurrentDocument from './getCurrentDocument';
import isDOMNode from './isDOMNode';



/**
 * Is the given object root node of the DOM (eg `<html>` for HTML documents og `<svg>` for SVG documents)
 *
 * @param node - The object to check
 * @returns Is it the root node of the DOM or not
 *
 * @example
 *
 * ```ts
 * isDOMRoot(document.documentElement) // --> true
 *
 * isDOMRoot(document.body) // --> false
 * isDOMRoot(document) // --> false
 * isDOMRoot(window) // --> false
 * ```
 */
export function isDOMRoot(node: unknown): node is HTMLElement {
  if (!isDOMNode(node)) return false;

  const doc = getCurrentDocument(node);
  return !!doc && node === doc.documentElement;
}

export default isDOMRoot;
