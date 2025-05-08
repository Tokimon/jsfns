import { isDOMNode } from './isDOMNode';

export interface ChildNodeWithParent extends ChildNode {
	parentElement: NonNullable<ChildNode['parentElement']>;
	parentNode: NonNullable<ChildNode['parentNode']>;
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
export const isDOMChildNode = (node: unknown): node is ChildNodeWithParent =>
	isDOMNode(node) && node.parentElement != null;

export default isDOMChildNode;
