import { isDOMNode } from './isDOMNode';

/**
 * Is the given object a Document Fragment
 *
 * @param obj - The object to check
 * @returns Is it a Document Fragment or not
 *
 * @example
 *
 * ```ts
 * isDOMFragment(document.createDocumentFragment()) // --> true
 *
 * isDOMFragment(document.createElement('p')) // --> false
 * isDOMFragment(document) // --> false
 * isDOMFragment(window) // --> false
 * ```
 */
export const isDOMFragment = (obj: unknown): obj is DocumentFragment =>
	isDOMNode(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;

export default isDOMFragment;
