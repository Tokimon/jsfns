import isDOMElement from './isDOMElement';
import isDOMFragment from './isDOMFragment';



/**
 * Is the given object a DOM node that can contain child DOM nodes
 *
 * @param obj - The object to check
 * @returns Is it a DOM container or not
 *
 * @example
 *
 * ```ts
 * isDOMContainer(document.documentElement) // --> true
 * isDOMContainer(document.body) // --> true
 * isDOMContainer(document.getElementById('my-elm')) // --> true
 * isDOMContainer(document.createDocumentFragment()) // --> true
 *
 * isDOMContainer(document) // --> false
 * isDOMContainer(document.createTextNode('')) // --> false
 * ```
 */
export default function isDOMContainer(obj: unknown): boolean {
  return isDOMElement(obj) || isDOMFragment(obj);
}
