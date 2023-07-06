/**
 * Split a String up into smaller strings of a give size (eg. 'ABCDEF' -> [AB,CD,EF])
 *
 * @param str - String to split up
 * @param options.size - Size par chunk
 * @param options.reverse - Should the chunks be taken in reverse order (['ab', 'cde'] vs ['abc', 'de'])
 *
 * @returns Array of string chunks
 *
 * @example
 * ```ts
 * chunkString('abcdefghijkl'); // --> ['ab', 'cd', 'ef', 'gh', 'ij', 'kl']
 * chunkString('abcdefghij', { size: 4 }); // --> ['abcd', 'efgh', 'ij']
 * chunkString('abcdefghij', { size: 4, reverse: true }); // --> ['ab', 'cdef', 'ghij']
 * ```
 */
export function chunkString(str: string, { size = 2, reverse = false } = {}): string[] {
  const rev = reverse ? `(?=(?:.{${size}})*$)` : '';
  return str.match(new RegExp(`.{1,${size}}${rev}`, 'g')) || [];
}

export default chunkString;
