import isDOMChildNode from './isDOMChildNode';

/**
 * Get all sibling elements after a given DOM element in the structure
 *
 * @param elm - DOM element to find siblings of
 * @returns Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * nextSiblings(someElement);
 * ```
 */
export function previousSiblings(elm: Element): Element[] {
  if (!isDOMChildNode(elm)) return [];

  const siblings = [];

  let sibling: Element | null = elm.nextElementSibling;

  while (sibling) {
    siblings.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  return siblings;
}

export default previousSiblings;
