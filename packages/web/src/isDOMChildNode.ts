import isDOMNode from './isDOMNode';



export interface ChildNodeWithParent extends ChildNode {
  parentElement: HTMLElement,
  parentNode: Node & ParentNode
}



/**
 * Is the given object a DOM node child of a DOM element
 *
 * @param obj - The object to check
 * @returns Is it a DOM child node or not
 *
 * @example
 *
 * ```ts
 * isDOMChildNode(document.body) // --> true
 * isDOMChildNode(document.getElementById('my-elm')) // --> true
 * isDOMChildNode(createDetachedDocument().body) // --> true
 *
 * isDOMChildNode(document.documentElement) // --> false
 * ```
 */
export default function isDOMChildNode(node: Node): node is ChildNodeWithParent {
  return isDOMNode(node) && node.parentElement != null;
}
