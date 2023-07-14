import { isString } from '@jsfns/core/isString';
import { type NotFirst } from './types';
import { uniqueNodeList } from './uniqueNodeList';

type Args = [elm: Document | HTMLElement, tagNames: string | string[]];

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
function findByTagName<T extends HTMLElement>(tagNames: Args[1]): T[];

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
function findByTagName<T extends HTMLElement>(elm: Args[0], tagNames: Args[1]): T[];

function findByTagName<T extends HTMLElement>(...args: Args | NotFirst<Args>): T[] {
  if (isString(args[0]) || Array.isArray(args[0])) return findByTagName(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, tagNames] = args as Args;
  if (!Array.isArray(tagNames)) tagNames = [tagNames];

  return uniqueNodeList<T>(...tagNames.map((cn) => elm.getElementsByTagName(cn) as HTMLCollectionOf<T>));
}

export { findByTagName };
export default findByTagName;
