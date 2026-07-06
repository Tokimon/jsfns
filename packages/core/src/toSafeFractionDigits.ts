import { clamp } from './clamp.js';

/**
 * Rounds a number and clamps it to 0-100, the range `Number.prototype.toFixed`
 * and `toExponential` accept as their fraction-digits argument.
 *
 * @param decimals - The desired number of fraction digits
 *
 * @returns A safe fraction-digit count between 0 and 100
 *
 * @example
 * ```ts
 * toSafeFractionDigits(4); // --> 4
 * toSafeFractionDigits(2.6); // --> 3
 * toSafeFractionDigits(-2); // --> 0
 * toSafeFractionDigits(150); // --> 100
 * ```
 */
export function toSafeFractionDigits(decimals: number) {
	return clamp(0, Math.round(decimals), 100);
}

export default toSafeFractionDigits;
