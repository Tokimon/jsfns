import { uniqueNodeList } from './uniqueNodeList';

/**
 * Find a DOM element with the given ID
 *
 * @param ids - ID to find the element by
 * @returns The found element
 *
 * @example
 *
 * ```ts
 * findById('my-id') // --> "#my-id" element
 * findById('non-existing') // --> null
 * ```
 */
function findById<T extends HTMLElement>(id: string): T | null;

/**
 * Find a DOM elements from a list of IDs
 *
 * @param ids - ID to find the element by
 * @returns The found elements
 *
 * @example
 *
 * ```ts
 * findById(['my-id', 'my-other-id']) // --> "#my-id" and "#my-other-elm" elements
 * findById(['non-existing', 'non-existing-2']) // --> []
 * ```
 */
function findById<T extends HTMLElement>(ids: string[]): T[];

function findById<T extends HTMLElement>(ids: string | string[]): T | T[] | null {
	const byId = (id: string) => document.getElementById(id) as T | null;
	return !Array.isArray(ids) ? byId(ids) : uniqueNodeList<T>(...ids.map(byId));
}

export { findById };
export default findById;
