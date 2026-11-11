import { capitalize } from './capitalize.js';
import { toWords } from './toWords.js';

/**
 * Transform a string into a phrase of capitalized words separated by spaces
 * (eg. 'camelCase' -> 'Camel Case' or 'kebab-case' -> 'Kebab Case')
 *
 * @param str - String to transform
 *
 * @returns The words of the string, capitalized and joined by a space
 *
 * @example
 * ```ts
 * toCapitalizedPhrase('camelCase'); // --> Camel Case
 * toCapitalizedPhrase('snake_case_value'); // --> Snake Case Value
 * toCapitalizedPhrase('some99words'); // --> Some 99 Words
 * ```
 */
export function toCapitalizedPhrase(str: string): string {
	return toWords(str).map(capitalize).join(' ');
}

export default toCapitalizedPhrase;
