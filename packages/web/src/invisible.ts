import { css } from './css';
import { hidden } from './hidden';

/**
 * Test if a given DOM element is invisible.
 *
 * Itself or a parent is:
 * - {@link hidden}
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
 * invisible(MyNormalElement) // --> false
 * invisible(myZeroHeightElement) // --> true
 * invisible(myZeroWidthElement) // --> true
 * invisible(myNoDisplayElement) // --> true
 * invisible(myNoVisibilityElement) // --> true
 * ```
 */
export function invisible(elm: HTMLElement): boolean {
	let checkElm: HTMLElement | null = elm;

	while (checkElm && checkElm.tagName !== 'BODY') {
		const collapsed = !checkElm.offsetHeight || !checkElm.offsetWidth;
		const invisible = hidden(checkElm) || css(checkElm, 'opacity') === 0 || collapsed;

		if (invisible) return true;

		checkElm = checkElm.parentElement;
	}

	return false;
}

export default invisible;
