import { toSafeFractionDigits } from './toSafeFractionDigits.js';

/**
 * Rounds a number to at most a given number of decimals, without padding
 * shorter results with trailing zeroes.
 *
 * @param num - Number to round
 * @param decimalCount - Maximum number of decimals to round to
 *
 * @returns The number rounded to the given number of decimals
 *
 * @example
 * ```ts
 * roundDecimals(3.14159, 2); // --> 3.14
 * roundDecimals(3.1, 4); // --> 3.1 (no trailing zeroes added)
 * roundDecimals(3.4500000003, 2); // --> 3.45 (floating point imprecision avoided)
 * ```
 */
export function roundDecimals(num: number, decimalCount: number) {
	const dec = toSafeFractionDigits(decimalCount);
	const multiplier = 10 ** dec;

	// toFixed is to avoid decimal imprecision (eg. 3.4500000003)
	const rounded = (Math.round(num * multiplier) / multiplier).toFixed(dec);

	// Then convert back to number to remove any trailing 0's
	return Number(rounded);
}

export default roundDecimals;
