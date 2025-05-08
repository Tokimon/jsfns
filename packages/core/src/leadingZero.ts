/**
 * Makes sure a given number is a certain length and fills excess space with zeroes (0)
 *
 * @param num - Number to add leading zeroes to
 * @param len - minimum length of the returned string
 *
 * @returns The given number as a string padded with zeroes to match the given min length
 *
 * @example
 * ```ts
 * leadingZero(1); // --> '01'
 * leadingZero(123); // --> '123'
 * leadingZero(123, 5); // --> '00123'
 * ```
 */
export const leadingZero = (num: number | string, len = 2): string =>
	num.toString().padStart(len, '0');

export default leadingZero;
