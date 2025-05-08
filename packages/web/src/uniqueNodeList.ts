import { isDOMNode } from './isDOMNode';

/**
 * Make a unique list of Elements from on or multiple Element collections
 * (usually as a result of some element selection method)
 *
 * @returns The unique list of elements
 *
 * @example
 *
 * ```ts
 * const byClassName = (selector) => document.getElementsByClassName(selector)
 *
 * // Using a single selector
 * findUniqueNodeCollection('my-elements', byClassName);
 *
 * // Using multiple selectors
 * findUniqueNodeCollection(['.my-element', 'sone-other-elements'], byClassName);
 * ```
 */
export function uniqueNodeList<T extends Element>(
	...args: (T | T[] | NodeListOf<T> | HTMLCollectionOf<T> | null)[]
): T[] {
	const collection = new Set<T>();

	for (let arg of args) {
		if (!arg) continue;
		if (isDOMNode(arg)) arg = [arg];

		for (let i = 0; i < arg.length; i++) collection.add(arg[i]);
	}

	return Array.from(collection);
}

export default uniqueNodeList;
