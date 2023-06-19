import isString from '@js-fns/core/isString';

import findUniqueNodes from './findUniqueNodeCollection';



const byCn = (elm: Document | Element) => (cn: string) => elm.getElementsByClassName(cn);



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
function findByClass(classNames: string | string[]): Element[]

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
function findByClass(elm: Document | Element, classNames: string | string[]): Element[]



function findByClass(
  elm: Document | Element | string | string[],
  classNames?: string | string[]
): Element[] {
  if (isString(elm) || Array.isArray(elm)) {
    [elm, classNames] = [document, elm];
  }

  return findUniqueNodes(
    classNames as string | string[],
    byCn(elm)
  );
}

export { findByClass };
export default findByClass;
