import leadingZero from './leadingZero';



/**
 * Convert a number to a Hexadecimal representation (eg. 180 => b4)
 *
 * @example
 * ```ts
 * numberToHex(180); // -> 'b4'
 * ```
 *
 * @param num - Number to convert
 * @return - Hex representation of the given number
 */
export default function numberToHex(num: number): string {
  return leadingZero(Math.round(num).toString(16), 2);
}
