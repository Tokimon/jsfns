import { isString } from '@jsfns/core/isString';
import { type NotFirst } from './types';
import { uniqueNodeList } from './uniqueNodeList';

type Args = [elm: Document | HTMLElement, classNames: string | string[]];

/**
 * Finds DOM elements with a given class name.
 * Separate multiple selectors by comma. Separate multiple class names by space.
 *
 * @param classNames - Class name(s) to find elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByClass('my-id') // --> all ".my-elm" elements
 * findByClass('my-id, my-other-elm') // --> all ".my-elm" and ".my-other-elm" elements
 * findByClass('my-id my-other-elm') // --> all ".my-elm.my-other-elm" elements
 * ```
 */
function findByClass<T extends HTMLElement>(classNames: Args[1]): T[];

/**
 * Finds DOM elements with a given class name from a given element.
 * Separate multiple selectors by comma. Separate multiple class names by space.
 *
 * @param elm - The DOM element to start the search from
 * @param classNames - Class name(s) to find elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByClass(myElm, 'my-id') // --> all ".my-elm" elements as descendant of myElm
 * findByClass(myElm, 'my-id, my-other-elm') // --> all ".my-elm" and ".my-other-elm" elements as descendant of myElm
 * findByClass(myElm, 'my-id my-other-elm') // --> all ".my-elm.my-other-elm" elements as descendant of myElm
 * ```
 */
function findByClass<T extends HTMLElement>(elm: Args[0], classNames: Args[1]): T[];

function findByClass<T extends HTMLElement>(...args: Args | NotFirst<Args>): T[] {
  if (isString(args[0]) || Array.isArray(args[0])) return findByClass(document, args[0]);

  // eslint-disable-next-line prefer-const
  let [elm, classNames] = args as Args;
  if (!Array.isArray(classNames)) classNames = [classNames];

  return uniqueNodeList(...classNames.map((cn) => elm.getElementsByClassName(cn) as HTMLCollectionOf<T>));
}

export { findByClass };
export default findByClass;
