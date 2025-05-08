import { selectorToHTML } from './selectorToHTML';
import { toDOM } from './toDOM';

/**
 * Creates an element from a given CSS selector (restricted to only one element)
 *
 * @param selector - The CSS selector to convert
 * @returns The created element
 *
 * @example
 *
 * ```ts
 * // Create a div
 * create(); // --> <div />
 *
 * // Create an element
 * create('img'); // --> <img />
 *
 * // Create an element from a selector
 * create('#MyElement.active'); // --> <div id="MyElement" class="active" />
 * ```
 */
export function createElement(selector = 'div'): Element {
	return /^[a-z]+$/i.test(selector)
		? document.createElement(selector)
		: (toDOM(selectorToHTML(selector)) as HTMLCollection)[0];
}

export default createElement;
