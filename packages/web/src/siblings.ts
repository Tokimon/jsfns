import isDOMChildNode from './isDOMChildNode';

/**
 * Get all sibling elements of a given DOM element
 *
 * @param elm - DOM element to find siblings of
 * @returns Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * siblings(someElement);
 * ```
 */
export function siblings(elm: Element): Element[] {
  if (!isDOMChildNode(elm)) return [];

  const siblings = [];

  let sibling: Element | null = elm.parentElement.firstElementChild;

  while (sibling) {
    if (sibling !== elm) siblings.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  return siblings;
}

export default siblings;
