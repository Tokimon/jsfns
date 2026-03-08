import { toWords } from './toWords';

/**
 * Transform phrase into a snake_case phrase
 * (eg. 'camelCase' -> 'camel-case' or 'spaced phrase' -> 'spaced-phrase')
 *
 * @param str - String to transform
 *
 * @returns The string transformed to snake_case
 *
 * @example
 * ```ts
 * snakeCase('Convert This phrase'); // --> convert_this_phrase
 * ```
 */
export function snakeCase(str: string): string {
	return toWords(str).join('_').toLowerCase();
}

export default snakeCase;
