import { clamp } from './clamp.js';

/** Options for the fuzzy Search */
export type FuzzySearchOptions = {
	/** Respect the case of the input, or not */
	caseSensitive?: boolean;
	/**
	 * How much of the `searchWord` may deviate (an insertion, deletion, substitution or swap of two
	 * neighboring characters is one edit), as a ratio of its length: at most
	 * `floor(searchWord.length * maxDeviation)` edits (default `0.2`). The length is the whole word,
	 * including the exact prefix and suffix, although only the middle can deviate.
	 */
	maxDeviation?: number;
	/** How many leading characters of the `searchWord` must match exactly (default `2`) */
	exactPrefixLength?: number;
	/** How many trailing characters of the `searchWord` must match exactly (default `0`) */
	exactSuffixLength?: number;
};

/**
 * Typo tolerant search: matches when the `searchWord` is found at the start of the `input`,
 * allowing a limited number of typos (see `maxDeviation`). Characters of the `input` after the
 * match are free, so it works for search-as-you-type.
 *
 * The `searchWord` is split into an exact prefix, a fuzzy middle and an exact suffix.
 *
 * @param input - Word or phrase to search in
 * @param searchWord - The word to find at the start of the `input`
 * @returns if the `searchWord` was found in the `input` or not
 *
 * @example
 *
 * ```ts
 * fuzzySearch('javascript rocks', 'javascript') // => true
 * fuzzySearch('javascript rocks', 'javascipt') // => true (missing character)
 * fuzzySearch('javascript rocks', 'javazcript') // => true (wrong character)
 * fuzzySearch('javascript rocks', 'javasrcipt') // => true (swapped characters)
 * fuzzySearch('javascript rocks', 'kavascript') // => false (the start must match)
 * fuzzySearch('javascript rocks', 'javascipt', { maxDeviation: 0 }) // => false
 * ```
 */
export function fuzzySearch(input: string, searchWord: string, options: FuzzySearchOptions = {}) {
	const {
		caseSensitive = false,
		maxDeviation = 0.2,
		exactPrefixLength = 2,
		exactSuffixLength = 0,
	} = options;

	let inp = input;
	let word = searchWord;

	if (!caseSensitive) [inp, word] = [inp.toLowerCase(), word.toLowerCase()];

	const maxEdits = Math.floor(word.length * maxDeviation);

	if (inp.startsWith(word)) return true;
	if (maxEdits <= 0 || inp.length + maxEdits < word.length) return false;

	// word = exact prefix + fuzzy middle + exact suffix
	const prefixLen = clamp(0, exactPrefixLength, word.length);
	const suffixLen = clamp(0, exactSuffixLength, word.length - prefixLen);

	if (!inp.startsWith(word.slice(0, prefixLen))) return false;

	const middle = word.slice(prefixLen, word.length - suffixLen);
	const suffix = word.slice(word.length - suffixLen);
	const middleLen = middle.length;

	// `rest` is the input after the prefix. `row[j]` is the edit distance between the first `j`
	// characters of `middle` and the first `k` characters of `rest`, for the current `k`.
	const rest = inp.slice(prefixLen);
	let prevRow: number[] = []; // The row for `k - 1`
	let row = Array.from({ length: middleLen + 1 }, (_, j) => j); // The row for `k`

	// Reading more than `middleLen + maxEdits` characters of `rest` can't be within budget
	for (let k = 0; k <= middleLen + maxEdits && k <= rest.length; k++) {
		if (row[middleLen] <= maxEdits && rest.startsWith(suffix, k)) return true;

		const char = rest[k]; // The character read to build the row for `k + 1`
		const nextRow = [row[0] + 1];

		for (let j = 1; j <= middleLen; j++) {
			const extra = row[j] + 1; // `char` is an extra character in the input
			const missing = nextRow[j - 1] + 1; // `middle[j - 1]` is missing from the input
			const paired = row[j - 1] + (char === middle[j - 1] ? 0 : 1); // A match, or a wrong character

			// The last two characters are swapped (`ab` vs `ba`)
			const swapped =
				j > 1 && char === middle[j - 2] && rest[k - 1] === middle[j - 1]
					? prevRow[j - 2] + 1
					: Number.POSITIVE_INFINITY;

			nextRow[j] = Math.min(extra, missing, paired, swapped);
		}

		[prevRow, row] = [row, nextRow];
	}

	return false;
}

export default fuzzySearch;
