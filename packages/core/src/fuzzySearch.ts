type FuzzySearchOptions = {
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
  if (!options?.caseSensitive) [input, searchWord] = [input.toLowerCase(), searchWord.toLowerCase()];

  const inputLen = input.length;
  const searchLen = searchWord.length;

  if (inputLen <= searchLen) return input === searchWord;

  for (let i = 0, j = -1; i < searchLen; i++) {
    while (j <= inputLen) {
      if (j === inputLen) return false;
      if (input[++j] === searchWord[i]) break;
    }
  }

  return true;
}

export default fuzzySearch;
