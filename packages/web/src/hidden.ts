import css from './css';
import inDOM from './inDOM';



/**
 * Test if a given DOM element is technically hidden
 *
 * - Not is DOM
 * - Collapsed (no width and height)
 * - display: none
 * - visibility: hidden.
 *
 * @param elm - DOM element to test
 * @returns Is the element technically hidden or not
 *
 * @example
 *
 * ```ts
 * hidden(myNormalElement) // --> false
 * hidden(myZeroWidthAndHeightElement) // --> true
 * hidden(myNoDisplayElement) // --> true
 * hidden(myNoVisibilityElement) // --> true
 * ```
 */
export default function hidden(elm: HTMLElement): boolean {
  return !inDOM(elm)
    || (!elm.offsetHeight && !elm.offsetWidth)
    || css(elm, 'visibility') === 'hidden';
}
