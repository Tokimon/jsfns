/**
 * Split a String up into smaller strings of a give size (eg. 'ABCDEF' -> [AB,CD,EF])
 *
 * @param str - String to split up
 * @param size - Size par chunk
 *
 * @returns Array of string chunks
 *
 * @example
 * ```ts
 * chunkString('abcdefghijkl'); // --> ['ab', 'cd', 'ef', 'gh', 'ij', 'kl']
 * chunkString('abcdefghijkl', 4); // --> ['abcd', 'efgh', 'ijkl']
 * ```
 */
export const chunkString = (str: string, size = 2): string[] => `${str || ''}`.match(new RegExp(`.{1,${size}}(?=\\B|$)`, 'g')) || [];

export default chunkString;
