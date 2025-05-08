import { type FormatNumberSettings, formatNumber } from './formatNumber';

export type CurrencyFormatter = (num: number) => string;

const thousandRegExp = /^(\D*)1(\D*)000(\D*)(\d*)(\D*)$/;

/**
 * Creates a function that formats a number to a given currency format (eg. 1000 -> 1.000,00 €)
 *
 * The template string should be the number 1000 described with before and after
 * symbols (no numbers), a thousand separator and a decimal separator followed by
 * the number of decimals defined with zeroes: `[before]1[thou.]000[dec.]00[after] -> $ 1,000.00`
 *
 * @param thousandTemplate - The template for how to format a number, takes an example of 1000 in the desired currency (eg. '1.000,00 €')
 *
 * @returns Curried function to format a given number
 *
 * @example
 * ```ts
 * // Format number to default currency format (euro)
 * const euro = formatCurrency();
 * euro(2345234.678); // --> '2.345.234,68 €'
 *
 * // Format number to USD currency format
 * const usd = formatCurrency('$ 1,000.00');
 * usd(2345234.678); // --> '$ 2,345,234.68'
 *
 * // Format number to custom currency format
 * const custom = formatCurrency('# 1-000;00 ¤');
 * custom(2345234.678); // --> '# 2-345-234;68 ¤'
 *
 * // Specifying number of decimals
 * const sixDecimals = formatCurrency('$ 1,000.000000');
 * sixDecimals(2345234.678); // --> '$ 2,345,234.678000'
 * sixDecimals(234.12345678); // --> '$ 234.123457'
 * ```
 */
export function formatCurrency(thousandTemplate = '1.000,00 €'): CurrencyFormatter {
	let m = thousandRegExp.exec(thousandTemplate);

	if (!m) m = thousandRegExp.exec('1.000,00 €') as RegExpExecArray;

	const [before, thousand, decimal, decimals, after] = m.slice(1);

	const settings: FormatNumberSettings = { decimalCount: decimals.length, thousand, decimal };

	return (num: number) => `${before}${formatNumber(num, settings)}${after}`;
}

export default formatCurrency;
