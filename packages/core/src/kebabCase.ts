import { toWords } from './toWords.js';

/**
 * Transform phrase into a dashed phrase
 * (eg. 'camelCase' -> 'camel-case' or 'spaced phrase' -> 'spaced-phrase')
 *
 * @param str - String to transform
 *
 * @returns The string with spaces replaced by a dash (-)
 *
 * @example
 * ```ts
 * kebabCase('some dashed phrase'); // --> some-dashed-phrase
 * kebabCase('dash version1 beta', { numbers: true }); // --> dash-version-1-beta
 * ```
 */
export function kebabCase(str: string) {
	return toWords(str).join('-').toLowerCase();
}

export default kebabCase;
