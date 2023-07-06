import { isString } from '@jsfns/core/isString';
import { uniqueNodeList } from './uniqueNodeList';

export type ArgsWithoutTarget = [tagNames: string | string[]];
export type ArgsWithTarget = [elm: Document | Element, tagNames: string | string[]];

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

function findByTagName<T extends ArgsWithTarget | ArgsWithoutTarget>(...args: T): Element[] {
  if (isString(args[0]) || Array.isArray(args[0])) return findByTagName(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, tagNames] = args as ArgsWithTarget;
  if (!Array.isArray(tagNames)) tagNames = [tagNames];

  return uniqueNodeList(...tagNames.map((cn) => elm.getElementsByTagName(cn)));
}

export { findByTagName };
export default findByTagName;
