import { isString } from '@jsfns/core/isString';
import { type NotFirst } from './types';
import { uniqueNodeList } from './uniqueNodeList';

type Args = [elm: Document | HTMLElement, queries: string | string[]];

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
function findByQuery<T extends HTMLElement>(elm: Args[0], queries: Args[1]): T[];

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
function findByQuery<T extends HTMLElement>(queries: Args[1]): T[];

function findByQuery<T extends HTMLElement>(...args: Args | NotFirst<Args>) {
  if (isString(args[0]) || Array.isArray(args[0])) return findByQuery(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, queries] = args as Args;
  if (Array.isArray(queries)) queries = queries.join(',');

  return uniqueNodeList<T>(elm.querySelectorAll<T>(queries));
}

export type OneArgs = [elm: Document | HTMLElement, query: string];

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
function findOneByQuery<T extends HTMLElement>(elm: Document | HTMLElement, query: string): T | null;

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
function findOneByQuery(query: string): HTMLElement | null;

function findOneByQuery<T extends HTMLElement>(...args: OneArgs | NotFirst<OneArgs>): T | null {
  if (isString(args[0])) return findOneByQuery(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, query] = args as OneArgs;

  return elm.querySelector<T>(query);
}

export { findByQuery, findOneByQuery };
export default findByQuery;
