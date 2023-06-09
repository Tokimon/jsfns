/**
 * Convert Hexadecimal into a number (eg. b4 => 180)
 *
 * @param hex - Hex code to parse
 *
 * @returns Numeric representation of the hex code
 *
 * @example
 * ```ts
 * hexToNumber('ba'); // -> 186
 * ```
 */
export default function hexToNumber(hex: string): number {
  return hex ? parseInt(hex, 16) : 0;
}
