import phrasify from './phrasify';
/**
 * Transform phrase into a dashed phrase
 * (eg. 'camelCase' -> 'camel-case' or 'spaced phrase' -> 'spaced-phrase')
 *
 * @example
 * ```ts
 * dashed('some dashed phrase'); // -> some-dashed-phrase
 * dasher('dash version1 beta', { numbers: true }); // -> dash-version-1-beta
 * ```
 *
 * @param str - String to transform
 * @param settings - Settings to pass to the phrasify function
 * @return - The string with spaces replaced by a dash (-)
 */
export default function dashed(str, settings) {
    return phrasify(str, settings)
        .toLowerCase()
        .replace(/\s+/g, '-');
}
