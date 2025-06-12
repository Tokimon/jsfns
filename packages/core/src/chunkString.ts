/** The options for the chunkString method */
export type ChunkStringOptions = {
	/** The max size of each chunk */
	size?: number;
	/** Chunk strings from the end to front (['ab', 'cde', 'fgh'] instead of ['abc', 'def', 'gh']) */
	reverse?: boolean;
};

/**
 * Split a String up into smaller strings of a give size (eg. 'ABCDEF' -> [AB,CD,EF])
 *
 * @param str - String to split up
 * @param options - The configuration options
 * @returns Array of chunks
 *
 * @example
 * ```ts
 * chunkString('abcdefghijkl'); // --> ['ab', 'cd', 'ef', 'gh', 'ij', 'kl']
 * chunkString('abcdefghij', { size: 4 }); // --> ['abcd', 'efgh', 'ij']
 * chunkString('abcdefghij', { size: 4, reverse: true }); // --> ['ab', 'cdef', 'ghij']
 * ```
 */
export function chunkString(str: string, options: ChunkStringOptions = {}): string[] {
	const { size = 2, reverse = false } = options;
	const rev = reverse ? `(?=(?:.{${size}})*$)` : '';
	return str.match(new RegExp(`.{1,${size}}${rev}`, 'g')) || [];
}

export default chunkString;
