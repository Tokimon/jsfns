import invisible from './invisible';

/**
 * Test if a given DOM element is visible.
 *
 * @param elm - DOM element to test
 * @returns Is the element visible for the user
 *
 * @example
 *
 * ```ts
 * visible(document.body) // --> true
 * visible(MyNormalElement) // --> true
 * visible(myZeroHeightElement) // --> false
 * visible(myZeroWidthElement) // --> false
 * visible(myNoDisplayElement) // --> false
 * visible(myNoVisibilityElement) // --> false
 * ```
 */
export const visible = (elm: HTMLElement): boolean => !invisible(elm);

export default visible;
