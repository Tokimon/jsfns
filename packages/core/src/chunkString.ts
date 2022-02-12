/**
 * Split a String up into smaller strings of a give size (eg. 'ABCDEF' -> [AB,CD,EF])
 *
 * @example
 * ```ts
 * chunkString('abcdefghijkl'); // -> ['ab', 'cd', 'ef', 'gh', 'ij', 'kl']
 * chunkString('abcdefghijkl', 4); // -> ['abcd', 'efgh', 'ijkl']
 * ```
 *
 * @param str - String to split up
 * @param size - Size par chunk
 * @return - Array of string chunks
 */
export default function chunkString(str: string, size = 2): string[] {
  return `${str || ''}`.match(new RegExp(`.{1,${size}}(?=\\B|$)`, 'g')) || [];
}
