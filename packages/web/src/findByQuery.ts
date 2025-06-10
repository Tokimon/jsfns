import { isString } from "@jsfns/core/isString";
import { uniqueNodeList } from "./uniqueNodeList";
import type { Maybe, NotFirst } from "./types";

/** The possible arguments for the `findByQuery` function */
export type Args = [
  elm: Maybe<Document | HTMLElement>,
  queries: string | string[],
];

/**
 * Find all elements matching a given CSS selector from a given element
 *
 * @param elm - The DOM element to start the search from
 * @param queries - CSS selector to find elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByQuery(MyElm, 'span.my-class') // --> All "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findByQuery<T extends HTMLElement>(
  elm: Args[0],
  queries: Args[1],
): T[];

/**
 * Find all elements matching a given CSS selector
 *
 * @param queries - CSS selector to find elements by
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
  if (isString(args[0]) || Array.isArray(args[0]))
    return findByQuery(document, args[0]);

  let [elm, queries] = args as Args;
  if (!elm) return [];
  if (Array.isArray(queries)) queries = queries.join(",");

  return uniqueNodeList<T>(elm.querySelectorAll<T>(queries));
}

/** The possible arguments for the findOneByQuery method */
export type OneArgs = [elm: Args[0], query: string];

/**
 * Find first elements matching a given CSS selector from a given element
 *
 * @param elm - The DOM element to start the search from
 * @param query - CSS selector to find elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findOneByQuery(MyElm, 'span.my-class') // --> First "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findOneByQuery<T extends HTMLElement>(
  elm: OneArgs[0],
  query: string,
): T | null;

/**
 * Find first elements matching a given CSS selector
 *
 * @param query - CSS selector to find elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findOneByQuery('span.my-class') // --> First "span.my-class" elements that are descendants of document
 * ```
 */
function findOneByQuery<T extends HTMLElement>(query: string): T | null;

function findOneByQuery<T extends HTMLElement>(
  ...args: OneArgs | NotFirst<OneArgs>
): T | null {
  if (isString(args[0])) return findOneByQuery(document, args[0]);

  const [elm, query] = args as OneArgs;

  return elm?.querySelector<T>(query) ?? null;
}

export { findByQuery, findOneByQuery };
export default findByQuery;
