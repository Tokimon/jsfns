import { type PhrasifySettings, phrasify } from './phrasify';

export type KebabCaseSettings = PhrasifySettings;

/**
 * Transform phrase into a dashed phrase
 * (eg. 'camelCase' -> 'camel-case' or 'spaced phrase' -> 'spaced-phrase')
 *
 * @param str - String to transform
 * @param settings - Settings to pass to the `phrasify` function
 *
 * @returns The string with spaces replaced by a dash (-)
 *
 * @example
 * ```ts
 * kebabCase('some dashed phrase'); // --> some-dashed-phrase
 * kebabCase('dash version1 beta', { numbers: true }); // --> dash-version-1-beta
 * ```
 */
export const kebabCase = (str: string, settings?: KebabCaseSettings) =>
	phrasify(str, settings).toLowerCase().replace(/\s+/g, '-');

export default kebabCase;
