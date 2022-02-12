import isString from './isString';



function maxDecimals(num: number, decimals: number): number {
  const multiplier = 10 ** decimals;
  // toFixed is to avoid decimal imprecision (eg. 3.4500000003)
  return Number((Math.round(num * multiplier) / multiplier).toFixed(decimals));
}

function minDecimals(num: number, decimals: number): string {
  const decLen = (String(num).split('.')[1] || '').length;
  return decimals <= decLen
    ? String(num)
    : num.toFixed(decimals);
}



/**
 * Limit decimals of a floating number to specified length. The length depends on
 * `decimals` which can have the following settings (n = integer):
 *
 * Char | Description
 * ----- | -------------
 * **>n** | Minimum number of decimals, if the current number of decimals are shorter than the defined length, extra 0 (zeros) will be added.
 * **<n** | Maximum number of decimals, longer decimals will be rounded and shortened down to this number.
 * **n** | Match this exact number of decimals, rounding longer decimals and adding extra 0 (zeroes) to shorter ones.
 *
 * @example
 * ```ts
 * // Exact number of decimals
 * limitDecimals(123.4567) // -> 123.46
 * limitDecimals(123, 5) // -> 123.00000
 *
 * // Max number of decimals
 * limitDecimals(123.4567, '<3') // -> 123.457
 * limitDecimals(123, '<3') // -> 123
 *
 * // Min number decimals
 * limitDecimals(123.4, '>4') // -> 123.4000
 * limitDecimals(123.456789, '>4') // -> 123.456789
 * ```
 *
 * @param num - Number to limit the decimals on
 * @param decimals - Setting for how to handle the decimals
 * @return - String representation of the number with the decimals adjusted according to the decimal setting
 */
export default function limitDecimals(num: number, decimals: number | string = 2): string {
  if (isString(decimals)) {
    if (decimals.startsWith('<')) {
      return String(maxDecimals(num, Number(decimals.slice(1))));
    }

    if (decimals.startsWith('>')) {
      return minDecimals(num, Number(decimals.slice(1)));
    }

    if (decimals.includes(',')) {
      const [minDec, maxDec] = decimals.split(/[, ]+/);
      let min = Number(minDec);
      let max = Number(maxDec);
      if (max < min) { [min, max] = [max, min]; }

      return minDecimals(maxDecimals(num, max), min);
    }

    decimals = Number(decimals) || 0;
  }


  return num.toFixed(decimals);
}
