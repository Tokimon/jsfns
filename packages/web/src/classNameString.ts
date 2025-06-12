import { isObject } from '@jsfns/core/isObject';
import { isString } from '@jsfns/core/isString';

/** The various input valid for classNameString */
export type SimpleClassNameInput = string | Record<string, boolean | undefined>;

/** All valid inputs for classNameString */
export type ClassNamesInput = SimpleClassNameInput | ClassNamesInput[];

/**
 * Create a string of names that will be used as class names for a given element.
 *
 * @param args a single class name or a record of class name: boolean
 * @returns The list of class names (eg. "my-elm open active")
 *
 * @example
 *
 * ```ts
 * classNameString('my-elm', 'open', 'active') // --> "my-elm open active"
 * classNameString(['my-elm', 'open', 'active']) // --> "my-elm open active"
 * classNameString('my-elm', ['open', 'active']) // --> "my-elm open active"
 * classNameString('my-elm', { open: true, active: true }) // --> "my-elm open active"
 * ```
 */
export function classNameString(...args: ClassNamesInput[]): string {
	const cns = [];
	const queue = [...args];
	let i = 0;

	while (i < queue.length) {
		const input = queue[i++];
		if (!input) continue;

		if (isString(input)) {
			cns.push(input);
		} else if (Array.isArray(input)) {
			queue.push(...input);
		} else if (isObject(input)) {
			for (const key in input) {
				const hasProp = Object.prototype.hasOwnProperty.call(input, key);
				if (hasProp && input[key]) cns.push(key);
			}
		}
	}

	return cns.join(' ');
}

export default classNameString;
