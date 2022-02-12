import phrasify, { PhrasifySettings } from './phrasify';



export type SnakeCaseSettings = PhrasifySettings;



/**
 * Transform phrase into a snake_case phrase
 * (eg. 'camelCase' -> 'camel-case' or 'spaced phrase' -> 'spaced-phrase')
 *
 * @example
 * ```ts
 * snakeCase('Convert This phrase'); // -> convert_this_phrase
 * snakeCase('dash VERSION1 beta', { numbers: true }); // -> dash_version_1_beta
 * ```
 *
 * @param str - String to transform
 * @param settings - Settings to pass to the phrasify function
 * @return - The string transformed to snake_case
 */
export default function snakeCase(str: string, settings?: SnakeCaseSettings): string {
  return phrasify(str, settings)
    .toLowerCase()
    .replace(/\s+/g, '_');
}
