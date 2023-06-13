/**
 * Is the given object a DOM Node
 *
 * @param obj - The object to check
 * @returns Is it a DOM node or not
 *
 * @example
 *
 * ```ts
 * isDOMNode(document.documentElement) // --> true
 * isDOMContainer(document.createTextNode('')) // --> true
 * isDOMContainer(document.createComment('')) // --> true
 *
 * isDOMContainer(window) // --> false
 * ```
 */
export default function isDOMNode(node: unknown): node is Node {
  return !!node && typeof (node as Node).nodeType !== 'undefined';
}
