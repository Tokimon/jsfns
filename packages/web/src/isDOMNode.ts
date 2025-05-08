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
 * isDOMNode(document.createTextNode('')) // --> true
 * isDOMNode(document.createComment('')) // --> true
 *
 * isDOMNode(window) // --> false
 * ```
 */
export const isDOMNode = (node: unknown): node is Node =>
	!!node && typeof (node as Node).nodeType !== 'undefined';

export default isDOMNode;
