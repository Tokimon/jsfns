import { isString } from './isString';

function maxDecimals(num: number, decimals: number) {
  const multiplier = 10 ** decimals;
  // toFixed is to avoid decimal imprecision (eg. 3.4500000003) and then convert back to number to remove any trailing 0's
  return Number((Math.round(num * multiplier) / multiplier).toFixed(decimals));
}

function minDecimals(num: number, decimals: number) {
  const strNum = num.toString();
  const decLen = (strNum.split('.')[1] ?? '').length;
  return decimals <= decLen ? strNum : Number(num).toFixed(decimals);
}

function parseMinMax(decimalCount: string) {
  const [minDec, maxDec] = decimalCount.split(/[,\s]+/);
  const min = Number(minDec);
  const max = Number(maxDec);

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
  if (!isString(decimalCount)) return num.toFixed(decimalCount);

  if (decimalCount.startsWith('<')) {
    return maxDecimals(num, Number(decimalCount.slice(1))).toString();
  }

  if (decimalCount.startsWith('>')) return minDecimals(num, Number(decimalCount.slice(1)));

  if (decimalCount.includes(',')) {
    const [min, max] = parseMinMax(decimalCount);
    return minDecimals(maxDecimals(num, max), min);
  }

  return num.toFixed(Number(decimalCount) || 0);
}

export default limitDecimals;
