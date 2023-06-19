import phrasify, { PhrasifySettings } from './phrasify';



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
 * dashed('some dashed phrase'); // -> some-dashed-phrase
 * dasher('dash version1 beta', { numbers: true }); // -> dash-version-1-beta
 * ```
 */
export function dashed(str: string, settings?: KebabCaseSettings): string {
  return phrasify(str, settings)
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export default dashed;
