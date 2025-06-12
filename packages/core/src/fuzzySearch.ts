/** Options for the fuzzy Search */
export type FuzzySearchOptions = {
	/** Respect the case of the input, or not */
	caseSensitive: boolean;
};

/**
 * Match the given search word (collection of characters) could be found in in a given input (word or phrase)
 *
 * @param input - Word or phrase to search in
 * @param searchWord - The collection of characters to match into the `input`
 * @returns if the `searchWord` was found in the `input` or not
 *
 * @example
 *
 * ```ts
 * fuzzySearch('search me', 'src') // => true
 * fuzzySearch('search me', 'ache') // => true
 * fuzzySearch('search me', 'reach') // => false
 * ```
 */
export function fuzzySearch(input: string, searchWord: string, options?: FuzzySearchOptions) {
	let inp = input;
	let word = searchWord;

	if (!options?.caseSensitive) [inp, word] = [inp.toLowerCase(), word.toLowerCase()];

	const inputLen = inp.length;
	const searchLen = word.length;

	if (inputLen <= searchLen) return inp === word;

	for (let i = 0, j = -1; i < searchLen; i++) {
		while (j <= inputLen) {
			if (j === inputLen) return false;
			if (inp[++j] === word[i]) break;
		}
	}

	return true;
}

export default fuzzySearch;
