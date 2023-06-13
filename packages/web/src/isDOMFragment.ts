import isDOMNode from './isDOMNode';

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
 * isDOMContainer(document.createElement('p')) // --> false
 * isDOMContainer(document) // --> false
 * isDOMContainer(window) // --> false
 * ```
 */
export default function isDOMFragment(obj: unknown): obj is DocumentFragment {
  return isDOMNode(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
