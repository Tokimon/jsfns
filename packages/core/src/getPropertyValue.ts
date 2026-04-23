import { isNumeric } from './isNumeric.ts';
import { isObject } from './isObject.ts';

/**
 * Read a value from an object by following a dot-separated path of keys.
 *
 * @param obj - The object to read from
 * @param path - Dot-separated path to the value (e.g. `'a.b.0.c'`)
 *
 * @returns The value at the given path, or `null` if any step of the path
 *          is missing or cannot be traversed
 *
 * @example
 * ```ts
 * getPropertyValue({ a: { b: 2 } }, 'a.b'); // --> 2
 * getPropertyValue({ a: [{ b: 'hi' }] }, 'a.0.b'); // --> 'hi'
 * getPropertyValue({ a: 1 }, 'a.b'); // --> null
 * ```
 */
export function getPropertyValue(obj: Record<string, unknown>, path: string) {
	const steps = path.split('.').reverse();
	let currLevel: unknown[] | Record<string, unknown> = obj;

	while (steps.length) {
		const prop = steps.pop();
		if (!prop || !(prop in currLevel)) break;

		let value: unknown;

		if (Array.isArray(currLevel)) {
			if (!isNumeric(prop)) break;
			value = currLevel[Number(prop)];
		} else {
			value = currLevel[prop];
		}

		if (!steps.length) return value;
		if (!(isObject(value) || Array.isArray(value))) break;

		currLevel = value;
	}

	return null;
}

export default getPropertyValue;
