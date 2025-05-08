import { uniqueNodeList } from './uniqueNodeList';

/**
 * Find DOM elements with the given name
 *
 * @param names - Value of name attribute to find the elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByName('my-element-name') // --> all "[name=my-element-name]" elements
 * findByName(['my-element-name', 'my-second-name']) // --> all "[name=my-element-name]" and "[name=my-second-name]" elements
 * ```
 */
export const findByName = <T extends HTMLElement>(names: string | string[]): T[] => {
	const _names = !Array.isArray(names) ? [names] : names;
	return uniqueNodeList<T>(..._names.map((n) => document.getElementsByName(n) as NodeListOf<T>));
};

export default findByName;
