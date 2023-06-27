import { isString } from '@jsfns/core/isString';
import { findByClass } from './findByClass';
import { findById } from './findById';
import { findByQuery } from './findByQuery';
import { findByTagName } from './findByTagName';

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
function find(selector: string): HTMLElement | Element | Element[] | null;

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
function find(elm: Document | Element, selector: string): HTMLElement | Element | Element[] | null;

function find(elm: Document | Element | string, selector?: string): HTMLElement | Element | Element[] | null {
  if (isString(elm)) [elm, selector] = [document, elm];

  const q = selector as string;
  const isComplex =
    q.includes(' ') ||
    q.includes('>') ||
    q.includes('+') ||
    q.includes('*') ||
    q.includes('~') ||
    q.includes(':') ||
    q.includes('[') ||
    q.includes(',');

  if (!isComplex) {
    const firstChar = q[0];
    const rest = q.substring(1);

    const isId = firstChar === '#';
    const isClass = firstChar === '.';
    const hasClass = rest.includes('.');
    const hasId = rest.includes('#');

    if (isId) {
      if (!hasClass) return elm === document ? findById(rest) : findByQuery(elm, q, true);
    } else if (isClass) {
      if (!hasId) return findByClass(elm, rest.split('.').join(' '));
    } else if (!hasId && !hasClass) {
      return findByTagName(elm, selector);
    }
  }

  return findByQuery(elm, q);
}

export { find };
export default find;
