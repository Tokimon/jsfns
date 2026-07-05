/**
 * Convert Hexadecimal into a number (eg. b4 => 180)
 *
 * @param hex - Hex code to parse
 *
 * @returns Numeric representation of the hex code or `NaN` if it could not be parsed correctly to a number
 *
 * @remarks Passing in numeric strings works and gives returns the number as parse with radix 16
 *
 * @example
 * ```ts
 * hexToNumber('ba'); // --> 186
 * hexToNumber('gg'); // --> NaN
 * hexToNumber('3000'); // --> 12288
 * ```
 */
export const hexToNumber = (hex: string) => Number.parseInt(hex, 16);

export default hexToNumber;
