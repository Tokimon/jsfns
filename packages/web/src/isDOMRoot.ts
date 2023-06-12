import getCurrentDocument from './getCurrentDocument';
import { GeneralWindow } from './types';



/**
 * Is the given object root node of the DOM (eg <html> for HTML documents og <svg> for SVG documents)
 *
 * @param obj - The object to check
 * @returns Is it the root node of the DOM or not
 */
export default function isDOMRoot(obj: Document | GeneralWindow | Node): obj is HTMLElement {
  const doc = getCurrentDocument(obj);
  return !!doc && obj === doc.documentElement;
}
