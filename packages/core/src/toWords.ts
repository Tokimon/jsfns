/**
 * Find the words in a string delimeterd by any non letter/number characters.
 * Numbers will be a word in them selves, so something like `some99words` becomes `[some, 99, words]`.
 *
 * @param str - String to find words in
 * @returns The words found in the string
 *
 * @example
 *
 * ```ts
 * toWords('camelCase') // --> ['camel', 'Case']
 * toWords('HTMLElement') // --> ['HTML', 'Element']
 * toWords('kebab-case') // --> ['kebab', 'case']
 * toWords('snake_case') // --> ['snake', 'case']
 * toWords('some99words') // --> ['some', '99', 'words']
 * ```
 */
export function toWords(str: string): string[] {
	return str
		.split(
			/(?:[\W_]+)|(?<=[a-z])(?=[A-Z])|(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])|(?<=[A-Z]+)(?=[A-Z][a-z])/,
		)
		.filter(Boolean);
}

export default toWords;
