import { isString } from '@jsfns/core/isString';
import { uniqueNodeList } from './uniqueNodeList';

export type ArgsWithoutTarget = [queries: string | string[]];
export type ArgsWithTarget = [elm: Document | Element, queries: string | string[]];

/**
 * Find all elements matching a given CSS selector from a given element
 *
 * @param elm - The DOM element to start the search from
 * @param queries - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByQuery(MyElm, 'span.my-class') // --> All "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findByQuery(elm: Document | Element, queries: string | string[]): Element[];

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
 * findByQuery('span.my-class') // --> All "span.my-class" elements that are descendants of document
 * ```
 */
function findByQuery(queries: string | string[]): Element[];

function findByQuery<T extends ArgsWithTarget | ArgsWithoutTarget>(...args: T): Element[] {
  if (isString(args[0]) || Array.isArray(args[0])) return findByQuery(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, queries] = args as ArgsWithTarget;
  if (Array.isArray(queries)) queries = queries.join(',');

  return uniqueNodeList(elm.querySelectorAll(queries));
}

/**
 * Find first elements matching a given CSS selector from a given element
 *
 * @param elm - The DOM element to start the search from
 * @param query - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findOneByQuery(MyElm, 'span.my-class') // --> First "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findOneByQuery(elm: Document | Element, query: string): Element | null;

/**
 * Find first elements matching a given CSS selector
 *
 * @param query - CSS selector to find elements by
 * @param first - Return only the first found element
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findOneByQuery('span.my-class') // --> First "span.my-class" elements that are descendants of document
 * ```
 */
function findOneByQuery(query: string): Element | null;

function findOneByQuery<T extends [elm: Document | Element, query: string] | [query: string]>(...args: T): Element | null {
  if (isString(args[0])) return findOneByQuery(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, query] = args as [elm: Document | Element, query: string];

  return elm.querySelector(query);
}

export { findByQuery, findOneByQuery };
export default findByQuery;
