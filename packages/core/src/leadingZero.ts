/**
 * Makes sure a given number is a certain length and fills excess space with zeroes (0)
 *
 * @example
 * ```ts
 * leadingZero(1); // -> '01'
 * leadingZero(123); // -> '123'
 * leadingZero(123, 5); // -> '00123'
 * ```
 *
 * @param num - Number to add leading zeroes to
 * @param len - minimum length of the returned string
 * @return - The given number as a string padded with zeroes to match the given min length
 */
export default function leadingZero(num: number | string, len = 2): string {
  num = String(num);

  return num.length > len
    ? num
    : `${'0'.repeat(len)}${num}`.substr(-len);
}
