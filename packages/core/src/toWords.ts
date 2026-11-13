// Any other letter or combining mark, so scripts without case still count as words
const LOWER = '[\\p{Ll}\\p{Lt}\\p{Lm}\\p{Lo}\\p{M}]';
const UPPER = '\\p{Lu}';
const DIGIT = '\\p{Nd}';

// Capitals not followed by lowercase, so in `HTMLElement` the last capital starts the next word
const ABBREVIATION = `${UPPER}+(?!${LOWER})`;
// Lowercase letters with an optional leading capital
const WORD = `${UPPER}?${LOWER}+`;

// Anything that is not matched (special characters) is ignored
const WORDS = new RegExp(`${DIGIT}+|${ABBREVIATION}|${WORD}`, 'gu');

/**
 * Split a string into its words.
 *
 * A word is a run of digits, an abbreviation (consecutive capitals), or lowercase letters with an
 * optional leading capital. Words are split at case changes (`camelCase`) and between letters and
 * digits (`some99words`). Any other character, such as spaces, punctuation, `-` and `_`, separates
 * words and is dropped. Letters and digits from any language are supported.
 *
 * @param str - String to find words in
 * @returns The words found in the string, or an empty array if there are none
 *
 * @example
 *
 * ```ts
 * toWords('camelCase') // --> ['camel', 'Case']
 * toWords('HTMLElement') // --> ['HTML', 'Element']
 * toWords('kebab-case') // --> ['kebab', 'case']
 * toWords('snake_case') // --> ['snake', 'case']
 * toWords('some99words') // --> ['some', '99', 'words']
 * toWords('ÉcoleÜber-straße') // --> ['École', 'Über', 'straße']
 * toWords('--- __') // --> []
 * ```
 */
export const toWords = (str: string): string[] => str.match(WORDS) ?? [];

export default toWords;
