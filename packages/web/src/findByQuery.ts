import { isString } from '@jsfns/core/isString';
import { uniqueNodeList } from './uniqueNodeList';

export type argsWithoutTarget = [queries: string | string[], first?: boolean];
export type argsWithTarget = [elm: Document | Element, queries: string | string[], first?: boolean];
export type ReturnValue<T extends argsWithoutTarget | argsWithTarget> = T extends argsWithTarget
  ? T[2] extends true
    ? Element | null
    : Element[]
  : T[1] extends true
  ? Element | null
  : Element[];

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
 * findByQuery(MyElm, 'span.my-class', true) // --> First "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findByQuery<T extends argsWithTarget>(...args: T): ReturnValue<T>;

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
 * findByQuery(MyElm, 'span.my-class') // --> All "span.my-class" elements that are descendants of MyElm
 * findByQuery(MyElm, 'span.my-class', true) // --> First "span.my-class" elements that are descendants of MyElm
 * ```
 */
function findByQuery<T extends argsWithoutTarget>(...args: T): ReturnValue<T>;

function findByQuery<T extends argsWithTarget | argsWithoutTarget>(...args: T): Element[] | Element | null {
  if (isString(args[0]) || Array.isArray(args[0])) {
    const [queries, first] = args as argsWithoutTarget;
    return findByQuery(document, queries, !!first);
  }

  // eslint-disable-next-line prefer-const
  let [elm, queries, first] = args as argsWithTarget;
  if (Array.isArray(queries)) queries = queries.join(',');

  return first ? elm.querySelector(queries) : uniqueNodeList(elm.querySelectorAll(queries));
}

export { findByQuery };
export default findByQuery;
