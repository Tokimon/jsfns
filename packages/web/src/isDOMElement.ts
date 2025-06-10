import { isDOMNode } from "./isDOMNode";

/**
 * Is the given object a DOM element node and optionally of a given type
 *
 * @param node - The object to check
 * @returns Is it a DOM element node or not and optionally of the right type
 *
 * @example
 *
 * ```ts
 * isDOMElement(document.createElement('p')) // --> true
 * isDOMElement(document.documentElement) // --> true
 * isDOMElement(document.body) // --> true
 *
 * isDOMElement(window) // --> false
 * isDOMElement(document.createTextNode('')) // --> false
 * ```
 */
export function isDOMElement(node: unknown): node is Element {
  return isDOMNode(node) && node.nodeType === Node.ELEMENT_NODE;
}

export default isDOMElement;
