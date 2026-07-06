import { toSafeFractionDigits } from './toSafeFractionDigits.js';

/**
 * Pads a number with trailing zeroes so it has at least a given number of
 * decimals, without truncating any decimals it already has beyond that.
 *
 * @param num - Number to pad
 * @param decimals - Minimum number of decimals the result should have
 *
 * @returns The number as a string, padded to at least the given number of decimals
 *
 * @example
 * ```ts
 * minDecimals(1.2, 4); // --> '1.2000'
 * minDecimals(1.23456, 2); // --> '1.23456' (already longer, left as is)
 * minDecimals(1, 2); // --> '1.00'
 * ```
 */
export function minDecimals(num: number, decimals: number) {
	const dec = toSafeFractionDigits(decimals);
	const strNum = num.toString();
	const currentDecLen = (strNum.split('.')[1] ?? '').length;

	return dec <= currentDecLen ? strNum : num.toFixed(dec);
}

export default minDecimals;
