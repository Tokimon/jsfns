/**
 * Convert Hexadecimal into a number (eg. b4 => 180)
 *
 * @param hex - Hex code to parse
 *
 * @returns Numeric representation of the hex code
 *
 * @example
 * ```ts
 * hexToNumber('ba'); // --> 186
 * ```
 */
export const hexToNumber = (hex: string): number => (hex ? Number.parseInt(hex, 16) : 0);

export default hexToNumber;
