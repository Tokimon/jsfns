import { isString } from '@jsfns/core/isString.js';
import { createElement } from './createElement.js';
import { isDOMChildNode } from './isDOMChildNode.js';

/**
 * Replace a given DOM element with another DOM element or plain HTML string
 *
 * @param elm - DOM element to replace
 * @param replacement - DOM element or plain HTML string to replace {elm}
 * @returns The value given in `elm`
 *
 * @example
 *
 * ```ts
 * // <div><span id='a' /></div>
 * replaceNode(document.getElementById('a'), document.createElement('p')) // --> <div><p /></div>
 * replaceNode(document.getElementById('a'), 'p.p') // --> <div><p class="p" /></div>
 * ```
 */
// biome-ignore lint/suspicious/noConfusingVoidType: elm.remove() returns void
export function replaceNode(elm: Node, replacement?: Node | string | null): Node | void {
	if (!isDOMChildNode(elm)) return;
	if (!replacement) return elm.remove();

	const rpl = isString(replacement) ? createElement(replacement) : replacement;

	elm.replaceWith(rpl);
	return elm;
}

export default replaceNode;
