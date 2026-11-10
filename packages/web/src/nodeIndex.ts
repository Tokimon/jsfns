import { isDOMChildNode } from './isDOMChildNode.ts';

/**
 * Find the index of a DOM element amongst its siblings
 *
 * @param elm - DOM element to find the index of
 * @returns The index of `elm`
 *
 * @example
 *
 * ```ts
 * nodeIndex(someDiv); // --> 3
 * ```
 */
export function nodeIndex(elm: unknown): number {
	if (!isDOMChildNode(elm)) return -1;

	return Array.prototype.indexOf.call(elm.parentNode.childNodes, elm);
}

export default nodeIndex;
