import { isNumber } from './isNumber.js';
import { isString } from './isString.js';
import { minDecimals } from './minDecimals.js';
import { roundDecimals } from './roundDecimals.js';
import { safeToFixed } from './safeToFixed.js';
import { toSafeFractionDigits } from './toSafeFractionDigits.js';

function toDecimals(decimals: string) {
	const dec = Number.parseInt(decimals.trim(), 10);
	return !isNumber(dec) ? 0 : toSafeFractionDigits(dec);
}

function parseMinMax(decimalCount: string) {
	const [minDec, maxDec] = decimalCount.split(/[,\s]+/);
	const min = toDecimals(minDec);
	const max = toDecimals(maxDec);

	return max < min ? [max, min] : [min, max];
}

/**
 * Limit decimals of a floating number to specified length. The length depends on `decimalCount`
 * which can have the following settings (eg. 2 or ">3" or "<5"):
 *
 * Char | Description
 * ----- | -------------
 * **>n** | Minimum number of decimals, if the current number of decimals are shorter than the defined length, extra 0 (zeros) will be added.
 * **<n** | Maximum number of decimals, longer decimals will be rounded and shortened down to this number.
 * **n** | Match this exact number of decimals, rounding longer decimals and adding extra 0 (zeroes) to shorter ones.
 *
 * @param num - Number to limit the decimals on
 * @param decimalCount - Setting for how to handle the decimals
 *
 * @returns String representation of the number with the decimals adjusted according to the decimal setting
 *
 * @example
 * ```ts
 * // Exact number of decimals
 * limitDecimals(123.4567) // --> 123.46
 * limitDecimals(123, 5) // --> 123.00000
 *
 * // Max number of decimals
 * limitDecimals(123.4567, '<3') // --> 123.457
 * limitDecimals(123, '<3') // --> 123
 *
 * // Min number decimals
 * limitDecimals(123.4, '>4') // --> 123.4000
 * limitDecimals(123.456789, '>4') // --> 123.456789
 *
 * // Min, Max number decimals
 * limitDecimals(123.4, '2,4') // --> 123.40
 * limitDecimals(123.456789, '2,4') // --> 123.4568
 * ```
 */
export function limitDecimals(num: number, decimalCount: number | string = 2): string {
	if (!isString(decimalCount)) return safeToFixed(num, decimalCount);

	if (decimalCount.startsWith('<')) {
		const decimals = toDecimals(decimalCount.slice(1));
		return roundDecimals(num, decimals).toString();
	}

	if (decimalCount.startsWith('>')) {
		const decimals = toDecimals(decimalCount.slice(1));
		return minDecimals(num, decimals);
	}

	if (decimalCount.includes(',')) {
		const [min, max] = parseMinMax(decimalCount);
		const maxNum = roundDecimals(num, max);
		return minDecimals(maxNum, min);
	}

	return safeToFixed(num, Number(decimalCount) || 0);
}

export default limitDecimals;
