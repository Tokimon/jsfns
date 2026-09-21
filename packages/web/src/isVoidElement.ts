import { isDOMElement } from './isDOMElement.js';

/**
 * Tag names of HTML's "void" elements - elements that can never have children.
 * This is simply a fixed, enumerated list per the WHATWG HTML spec; there is no
 * DOM API to detect this generically from an element or a tag name.
 */
export const voidTags = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
];

/**
 * Is the given object a DOM element that can never have children (a "void" element,
 * e.g. `<input>`, `<img>`, `<br>`)
 *
 * @param obj - The object to check
 * @returns Is it a void element or not
 *
 * @example
 *
 * ```ts
 * isVoidElement(document.createElement('input')) // --> true
 * isVoidElement(document.createElement('br')) // --> true
 *
 * isVoidElement(document.createElement('div')) // --> false
 * isVoidElement(document.body) // --> false
 * ```
 */
export function isVoidElement(obj: unknown): boolean {
	return isDOMElement(obj) && voidTags.includes(obj.tagName.toLowerCase());
}

export default isVoidElement;
