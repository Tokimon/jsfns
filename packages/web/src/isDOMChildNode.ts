import { isDOMNode } from './isDOMNode';

/** A DOM Child Node parent properties */
export type ChildNodeParentProps = 'parentElement' | 'parentNode';

/** A DOM child node with DOM element parent */
export type ChildNodeWithParent = Omit<ChildNode, ChildNodeParentProps> & {
	[K in ChildNodeParentProps]: NonNullable<HTMLElement[K]>;
};

/**
 * Is the given object a DOM node child of a DOM element
 *
 * @param node - The object to check
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
