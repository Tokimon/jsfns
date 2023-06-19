/**
 * Generates a unique numeric hash (DJB2) code from a string
 *
 * @param str - String to generate hash code from
 *
 * @returns Hash code
 *
 * @example
 * ```ts
 * hashCode('Hash this string'); // -> 1720121313
 * ```
 */
export function hashCode(str: string): number {
  const l = str.length;
  let h = 0;

  for (let i = 0; i < l; i++) {
    h = (((h << 5) - h) + str.charCodeAt(i)) | 0;
  }

  return (h >>> 0);
}



/**
 * Generates a unique hash (DJB2) string from a string
 *
 * @example
 * ```ts
 * hash('Hash this string'); // -> sg463l
 * ```
 *
 * @param str - String to generate hash string from
 * @returns Hash string
 */
export function hash(str: string): string {
  const code = hashCode(str);
  return code === 0 ? '' : code.toString(36);
}

export default hash;
