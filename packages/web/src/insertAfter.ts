import isString from '@js-fns/core/isString';
import ensureHTML from './ensureHTML';
import inDOM from './inDOM';
import isDOMRoot from './isDOMRoot';

/**
 * Inserts DOM element or plain HTML after a given DOM element
 * (not possible for detached elements or the <html> element)
 *
 * @param elm - The DOM element to insert elements after
 * @param insertElm - DOM element or HTML (or selector) to insert
 * @returns The inserted element
 *
 * @example
 *
 * ```ts
 * insertAfter(document.documentElement, myInsertElm) // --> null (not possible)
 * insertAfter(document.createElement('div'), myInsertElm) // --> null (not possible)
 *
 * insertAfter(myElm, myInsertElm) // --> myInsertElement
 * insertAfter(myElm, '<div />') // --> <div />
 * insertAfter(myElm, '.inserted-element') // --> <div class="inserted-element" />
 * ```
 */
export function insertAfter(elm: Element, insertElm: string | Element): Element | null {
  if (!inDOM(elm) || isDOMRoot(elm)) {
    return null;
  }

  if (isString(insertElm)) {
    elm.insertAdjacentHTML('afterend', ensureHTML(insertElm));
  } else {
    elm.insertAdjacentElement('afterend', insertElm);
  }

  return elm.nextElementSibling;
}

export default insertAfter;
