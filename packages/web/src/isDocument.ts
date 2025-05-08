import { isDOMNode } from './isDOMNode';

/**
 * Is the given object a DOM document node
 *
 * @param obj - The object to check
 * @returns Is it a DOM document node or not
 *
 * @example
 *
 * ```ts
 * isDocument(window.document) // --> true
 *
 * isDocument(window) // --> false
 * isDocument(document.body) // --> false
 * ```
 */
export const isDocument = (obj: unknown): obj is Document =>
	isDOMNode(obj) && obj.nodeType === Node.DOCUMENT_NODE;

export default isDocument;
