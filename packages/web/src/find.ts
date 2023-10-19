import { isString } from '@jsfns/core/isString';
import { findByClass } from './findByClass';
import { findById } from './findById';
import { findByQuery, findOneByQuery } from './findByQuery';
import { findByTagName } from './findByTagName';
import { type Maybe, type NotFirst } from './types';

type Args = [elm: Maybe<Document | HTMLElement>, selector: string];

/**
 * Find elements by a given selector. The selector will be lightly analyzed to determine
 * the appropriate `findByXX` function. This should be faster than just running querySelector(All)
 * to find elements.
 *
 * @param selector - The selector to use
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * find('#my-id') // Uses getElementById()
 * find('.my-class') // Uses getElementsByClassName()
 * find('div') // Uses getElementsByTagName()
 * find('#my-id.my-class') // Uses querySelectorAll()
 * find('#my-id > .my-class + p') // Uses querySelectorAll()
 * ```
 */
function find<T extends HTMLElement>(selector: Args[1]): T | T[] | null;

/**
 * Find elements by a given selector from a given element. The selector will be lightly analyzed to determine
 * the appropriate `findByXX` function. This should be faster than just running querySelector(All)
 * to find elements.
 *
 * @param elm - The DOM element to start the search from
 * @param selector - The selector to use
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * find(myElm, '#my-id') // Uses myElm.querySelectorAll()
 * find(myElm, '.my-class') // Uses myElm.getElementsByClassName()
 * find(myElm, 'div') // Uses myElm.getElementsByTagName()
 * find(myElm, '#my-id.my-class') // Uses myElm.querySelectorAll()
 * find(myElm, '#my-id > .my-class + p') // Uses myElm.querySelectorAll()
 * ```
 */
function find<T extends HTMLElement>(elm: Args[0], selector: Args[1]): T | T[] | null;

function find<T extends HTMLElement>(...args: Args | NotFirst<Args>): T | T[] | null {
  if (isString(args[0])) return find(document, args[0]);

  const [elm, q] = args as Args;

  if (!/[ >+*~\[,:]/.test(q)) {
    const rest = q.substring(1);
    const hasClass = rest.includes('.');
    const hasId = rest.includes('#');

    if (q[0] === '#') {
      if (!hasClass) return elm === document ? findById<T>(rest) : findOneByQuery<T>(elm, q);
    } else if (q[0] === '.') {
      if (!hasId) return findByClass<T>(elm, rest.split('.').join(' '));
    } else if (!hasId && !hasClass) {
      return findByTagName<T>(elm, q);
    }
  }

  return findByQuery(elm, q);
}

export { find };
export default find;
