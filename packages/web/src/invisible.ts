import css from './css';
import hidden from './hidden';

/**
 * Test if a given DOM element is invisible.
 *
 * Itself or a parent is:
 * - hidden (see `hidden`)
 * - No width or no height
 * - opacity: 0
 *
 * @param elm - DOM element to test
 * @returns Is the element invisible
 *
 * @example
 *
 * ```ts
 * invisible(document.body) // --> false
 * invisible(myZeroHeightElement) // --> true
 * invisible(myZeroWidthElement) // --> true
 * invisible(myNoDisplayElement) // --> true
 * invisible(myNoVisibilityElement) // --> true
 * ```
 */
export default function invisible(elm: HTMLElement): boolean {
  let checkElm: HTMLElement | null = elm;

  while (checkElm && checkElm.tagName !== 'BODY') {
    if (
      hidden(checkElm)
      || !checkElm.offsetHeight
      || !checkElm.offsetWidth
      || css(checkElm, 'opacity') === 0
    ) {
      return true;
    }

    checkElm = checkElm.parentElement;
  }

  return false;
}
