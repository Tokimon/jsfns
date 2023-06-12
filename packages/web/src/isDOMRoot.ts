import getCurrentDocument from './getCurrentDocument';
import { GeneralWindow } from './types';



/**
 * Is the given object root node of the DOM (eg `<html>` for HTML documents og `<svg>` for SVG documents)
 *
 * @param node - The object to check
 * @returns Is it the root node of the DOM or not
 */
export default function isDOMRoot(node: Document | GeneralWindow | Node): node is HTMLElement {
  const doc = getCurrentDocument(node);
  return !!doc && node === doc.documentElement;
}
