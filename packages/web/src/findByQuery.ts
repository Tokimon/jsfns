import isString from '@js-fns/core/isString';
import findUniqueNodes from './findUniqueNodeCollection';

const qs = (elm: Document | Element, q: string) => elm.querySelector(q);
const qsAll = (elm: Document | Element) => (q: string) => elm.querySelectorAll(q);

/**
 * Find an element by given CSS selector
 *
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByQuery('span.my-class', true) // --> First "span.my-class" elements
 * ```
 */
function findByQuery(queries: string | string[], first: true): Element | null;

/**
 * Find an element by a given CSS selector from within a given element
 *
 * @param elm - The DOM element to start the search from
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByQuery(MyElm, 'span.my-class', true) // --> First "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findByQuery(elm: Document | Element, queries: string | string[], first: true): Element | null;

/**
 * Find all elements matching a given CSS selector
 *
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByQuery(MyElm, 'span.my-class', true) // --> All "span.my-class" elements
 * ```
 */
function findByQuery(queries: string | string[], first?: false): Element[];

/**
 * Find all elements matching a given CSS selector from within a given element
 *
 * @param elm - The DOM element to start the search from
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByQuery(MyElm, 'span.my-class', true) // --> All "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findByQuery(elm: Document | Element, queries: string | string[], first?: false): Element[];

function findByQuery(
  elm: Document | Element | string | string[],
  queries?: string | string[] | boolean,
  first?: boolean
): Element | Element[] | null {
  if (isString(elm) || Array.isArray(elm)) {
    first = queries as boolean;
    queries = elm as string | string[];
    elm = document;
  }

  if (Array.isArray(queries)) queries = queries.join(',');

  const q = queries as string;

  return first ? qs(elm, q) : findUniqueNodes(q, qsAll(elm));
}

export { findByQuery };
export default findByQuery;
