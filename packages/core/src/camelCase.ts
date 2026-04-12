import { toWords } from './toWords.js';

/** Settings for how to format the Camel Case */
export type CamelCaseSettings = {
	/** Convert to UpperCase CamelCase (aka PascalCase) */
	upper?: boolean;
	/** Keep abbreviations uppercase (false == HTMLElement => HtmlElement | true == HTMLElement => HTMLElement) */
	abbr?: boolean;
};

/** Default settings for the camelCase method */
export const defaultSettings: CamelCaseSettings = {
	upper: false,
	abbr: false,
};

/**
 * Transform a string into a camelCased word (eg. 'camel case' -> 'camelCase')
 *
 * @param input The string to format
 * @param settings The settings for the transform
 *
 * @returns The formatted string
 *
 * @example
 * ```ts
 * camelCase('data-value2-input'); // --> dataValue2input
 * camelCase('XML data input'); // --> XmlDataInput
 *
 * // With settings
 * const settings = { abbr: true, numbers: true, upper: true };
 *
 * camelCase('data-VALUE2-input', settings); // --> DataVALUE2Input
 * ```
 */
export function camelCase(input: string, settings?: CamelCaseSettings): string {
	if (!input) return '';

	const { upper, abbr } = { ...defaultSettings, ...settings };

	return toWords(input)
		.map((word, i) => {
			if (!Number.isNaN(Number(word))) return word;
			if (abbr && word === word.toUpperCase()) return word;

			const lower = word.toLowerCase();
			if (!upper && i === 0) return lower;

			return lower[0].toUpperCase() + lower.slice(1);
		})
		.join('');
}

export default camelCase;
