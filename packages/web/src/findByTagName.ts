import isString from '@js-fns/core/isString';

import findUniqueNodes from './findUniqueNodeCollection';

const byTag = (elm: Document | Element) => (tag: string) => elm.getElementsByTagName(tag);

/**
 * Find elements by given tag name
 *
 * @param elm - The DOM element to start the search from
 * @param tagNames - Tag name to find the elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByTagName('div') // --> All <div> elements
 * ```
 */
function findByTagName(tagNames: string | string[]): Element[];

/**
 * Find elements by given tag name
 *
 * @param elm - The DOM element to start the search from
 * @param tagNames - Tag name to find the elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByTagName(MyElm, 'div') // --> All <div> elements that are descendants of MyElm
 * ```
 */
function findByTagName(elm: Document | Element, tagNames?: string | string[]): Element[];

function findByTagName(elm: Document | Element | string | string[], tagNames?: string | string[]): Element[] {
  if (isString(elm) || Array.isArray(elm)) {
    [elm, tagNames] = [document, elm];
  }

  return findUniqueNodes(tagNames as string | string[], byTag(elm));
}

export { findByTagName };
export default findByTagName;
