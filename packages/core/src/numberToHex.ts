import leadingZero from './leadingZero';



/**
 * Convert a number to a Hexadecimal representation (eg. 180 => b4)
 *
 * @param num - Number to convert
 *
 * @returns Hex representation of the given number
 *
 * @example
 * ```ts
 * numberToHex(180); // -> 'b4'
 * ```
 */
export default function numberToHex(num: number): string {
  return leadingZero(Math.round(num).toString(16), 2);
}
