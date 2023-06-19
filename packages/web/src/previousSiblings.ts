import isDOMChildNode from './isDOMChildNode';

/**
 * Get all sibling elements before a given DOM element in the structure
 *
 * @param elm - DOM element to find siblings of
 * @returns Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * previousSiblings(someElement);
 * ```
 */
export function previousSiblings(elm: Element): Element[] {
  if (!isDOMChildNode(elm)) return [];

  const siblings = [];

  let sibling: Element | null = elm.previousElementSibling;

  while (sibling) {
    siblings.push(sibling);
    sibling = sibling.previousElementSibling;
  }

  return siblings;
}

export default previousSiblings;
