/**
 * Convert Hexadecimal into a number (eg. b4 => 180)
 *
 * @example
 * ```ts
 * hexToNumber('ba'); // -> 186
 * ```
 *
 * @param hex - Hex code to parse
 * @return - Numeric representation of the hex code
 */
export default function hexToNumber(hex: string): number {
  return hex ? parseInt(hex, 16) : 0;
}
