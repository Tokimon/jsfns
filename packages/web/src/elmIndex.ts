import { children } from './children';
import { isDOMChildNode } from './isDOMChildNode';

/**
 * Find the index of a DOM element amongst its siblings
 *
 * @param elm - DOM element to find the index of
 * @returns The index of `elm`
 *
 * @example
 *
 * ```ts
 * elmIndex(someDiv); // --> 3
 * ```
 */
export function elmIndex(elm: Element): number {
	return isDOMChildNode(elm) ? children(elm.parentNode).indexOf(elm) : -1;
}

export default elmIndex;
